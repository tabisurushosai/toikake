import { generateToikake } from '../lib/ai.js';
import { getPrompt } from '../lib/prompts.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GENERATE_QUESTIONS') {
    handleGenerateQuestions(message.options).then(sendResponse);
    return true; // Keep message channel open for async response
  }
});

async function handleGenerateQuestions(options) {
  try {
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

    const storage = await chrome.storage.local.get(['apiKey', 'age', 'subject']);
    const prompt = getPrompt({
      age: storage.age || options.age,
      subject: storage.subject || options.subject
    });

    const aiResponse = await generateToikake(storage.apiKey, prompt, extraction.textContent);
    
    // AI response is expected to be JSON. Let's try to parse it.
    // Sometimes AI adds markdown backticks.
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('AIからの応答形式が正しくありません。');
    
    const data = JSON.parse(jsonMatch[0]);
    
    const historyEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      url: tab.url,
      title: extraction.title,
      questions: data.questions
    };
    await saveHistory(historyEntry);

    return { success: true, questions: data.questions };
  } catch (error) {
    console.error('Error in handleGenerateQuestions:', error);
    return { success: false, error: error.message };
  }
}
