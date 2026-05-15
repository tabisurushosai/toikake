const generateBtn = document.getElementById('generate');
const resultsDiv = document.getElementById('results');
const childSelect = document.getElementById('child-select');

// Tab elements
const tabMain = document.getElementById('tab-main');
const tabHistory = document.getElementById('tab-history');
const viewMain = document.getElementById('view-main');
const viewHistory = document.getElementById('view-history');
const refreshHistoryBtn = document.getElementById('refresh-history');
const historyListDiv = document.getElementById('history-list');

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['children'], (result) => {
    if (result.children && result.children.length > 0) {
      result.children.forEach(child => {
        const option = document.createElement('option');
        option.value = child.age;
        option.textContent = `${child.name} (${child.age}歳)`;
        childSelect.appendChild(option);
      });
      childSelect.selectedIndex = 1; // Default to first child if exists
    }
  });
  loadHistory();
});

// Tab switching logic
tabMain.addEventListener('click', () => {
  tabMain.classList.add('active');
  tabHistory.classList.remove('active');
  viewMain.style.display = 'block';
  viewHistory.style.display = 'none';
});

tabHistory.addEventListener('click', () => {
  tabHistory.classList.add('active');
  tabMain.classList.remove('active');
  viewHistory.style.display = 'block';
  viewMain.style.display = 'none';
  loadHistory();
});

refreshHistoryBtn.addEventListener('click', loadHistory);

function loadHistory() {
  chrome.storage.local.get(['history'], (result) => {
    const history = result.history || [];
    historyListDiv.innerHTML = '';
    
    if (history.length === 0) {
      historyListDiv.innerHTML = '<p>履歴がありません。</p>';
      return;
    }

    history.forEach(entry => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'history-item';
      
      const dateStr = new Date(entry.timestamp).toLocaleString();
      
      const headerDiv = document.createElement('div');
      headerDiv.className = 'history-header';

      const titleGroup = document.createElement('div');
      titleGroup.className = 'history-title-group';

      const dateDiv = document.createElement('div');
      dateDiv.className = 'history-date';
      dateDiv.textContent = dateStr;
      
      const titleDiv = document.createElement('div');
      titleDiv.className = 'history-title';
      titleDiv.textContent = entry.title || 'タイトルなし';
      
      titleGroup.appendChild(dateDiv);
      titleGroup.appendChild(titleDiv);

      const favBtn = document.createElement('button');
      favBtn.className = 'favorite-btn';
      favBtn.textContent = entry.favorite ? '★' : '☆';
      if (entry.favorite) {
        favBtn.classList.add('favorited');
      }
      favBtn.addEventListener('click', () => {
        entry.favorite = !entry.favorite;
        chrome.storage.local.set({ history }, () => {
          loadHistory();
        });
      });

      headerDiv.appendChild(titleGroup);
      headerDiv.appendChild(favBtn);
      
      itemDiv.appendChild(headerDiv);
      
      entry.questions.forEach(q => {
        const qDiv = document.createElement('div');
        qDiv.className = 'history-question';
        qDiv.innerHTML = `<strong>[${q.type}]</strong> ${q.text}`;
        itemDiv.appendChild(qDiv);
      });
      
      historyListDiv.appendChild(itemDiv);
    });
  });
}

generateBtn.addEventListener('click', async () => {
  generateBtn.disabled = true;
  generateBtn.textContent = '生成中...';
  resultsDiv.innerHTML = '<p>AIが考え中... (数十秒かかることがあります)</p>';

  try {
    const selectedAge = childSelect.value;
    const selectedSubject = document.getElementById('subject-select').value;
    const response = await chrome.runtime.sendMessage({
      type: 'GENERATE_QUESTIONS',
      options: { age: selectedAge, subject: selectedSubject }
    });

    if (response.success) {
      displayResults(response.questions);
      loadHistory(); // Refresh history quietly
    } else {
      resultsDiv.innerHTML = `<p class="error">エラー: ${response.error}</p>`;
    }
  } catch (error) {
    resultsDiv.innerHTML = `<p class="error">通信エラーが発生しました。</p>`;
    console.error(error);
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = '問いかけを生成';
  }
});

function displayResults(questions) {
  resultsDiv.innerHTML = '';
  questions.forEach(q => {
    const card = document.createElement('div');
    card.className = 'card';
    
    const type = document.createElement('div');
    type.className = 'card-type';
    type.textContent = q.type;
    
    const text = document.createElement('div');
    text.className = 'card-text';
    text.textContent = q.text;
    
    card.appendChild(type);
    card.appendChild(text);
    resultsDiv.appendChild(card);
  });
}
