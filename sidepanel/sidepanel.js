const generateBtn = document.getElementById('generate');
const resultsDiv = document.getElementById('results');
const childSelect = document.getElementById('child-select');

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
});

generateBtn.addEventListener('click', async () => {
  generateBtn.disabled = true;
  generateBtn.textContent = '生成中...';
  resultsDiv.innerHTML = '<p>AIが考え中... (数十秒かかることがあります)</p>';

  try {
    const selectedAge = childSelect.value;
    const response = await chrome.runtime.sendMessage({
      type: 'GENERATE_QUESTIONS',
      options: { age: selectedAge }
    });

    if (response.success) {
      displayResults(response.questions);
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
