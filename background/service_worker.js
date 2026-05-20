import { generateToikake } from '../lib/ai.js';
import { getPrompt } from '../lib/prompts.js';
import { getFallbackQuestions } from '../lib/fallback.js';

// Setup side panel behavior
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(console.error);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GENERATE_QUESTIONS') {
    handleGenerateQuestions(message.options).then(sendResponse);
    return true; // Keep message channel open for async response
  }
});

async function handleGenerateQuestions(options) {
  try {
    const storage = await chrome.storage.local.get(['apiKey', 'age', 'subject', 'usageCount', 'usageDate', 'isPaid']);
    const today = new Date().toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' });

    let currentUsage = storage.usageCount || 0;
    const lastUsageDate = storage.usageDate || '';

    if (lastUsageDate !== today) {
      currentUsage = 0;
    }

    if (!storage.isPaid && currentUsage >= 3) {
      throw new Error('無料版の1日の生成回数(3回)の上限に達しました。明日またお試しください。');
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) throw new Error('アクティブなタブが見つかりません。');

    // Inject Readability and Extract scripts
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content/readability.js']
    });

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content/extract.js']
    });

    const extraction = results[0].result;
    if (extraction.error) throw new Error(extraction.error);

    const promptOptions = {
      age: storage.age || options.age,
      subject: storage.subject || options.subject
    };

    let questions = null;
    let source = 'builtin';

    // APIキーがある場合のみ AI 生成を試みる。失敗時は内蔵問いかけ集にフォールバック。
    if (storage.apiKey) {
      try {
        const prompt = getPrompt(promptOptions);
        const aiResponse = await generateToikake(storage.apiKey, prompt, extraction.textContent);
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('AIからの応答形式が正しくありません。');
        const data = JSON.parse(jsonMatch[0]);
        if (data && Array.isArray(data.questions) && data.questions.length > 0) {
          questions = data.questions;
          source = 'ai';
        }
      } catch (aiError) {
        console.warn('AI生成に失敗したため内蔵問いかけ集を使用します:', aiError.message);
      }
    }

    // APIキー未設定、または AI 生成に失敗した場合は内蔵問いかけ集を使う。
    if (!questions) {
      questions = getFallbackQuestions(promptOptions);
      source = 'builtin';
    }

    const historyEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      url: tab.url,
      title: extraction.title,
      questions: questions
    };
    await saveHistory(historyEntry);

    await chrome.storage.local.set({
      usageCount: currentUsage + 1,
      usageDate: today
    });

    return { success: true, questions: questions, source: source };
  } catch (error) {
    console.error('Error in handleGenerateQuestions:', error);
    return { success: false, error: error.message };
  }
}

async function saveHistory(entry) {
  const result = await chrome.storage.local.get(['history']);
  const history = result.history || [];
  history.unshift(entry);
  await chrome.storage.local.set({ history });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'toikake-generate',
    title: 'Toikakeで問いかけ生成',
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'toikake-generate') {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});
