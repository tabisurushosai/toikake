document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save-btn').addEventListener('click', saveOptions);
document.getElementById('add-child-btn').addEventListener('click', () => addChildEntry());

function addChildEntry(name = '', age = '') {
  const container = document.getElementById('children-container');
  const entry = document.createElement('div');
  entry.className = 'child-entry';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = '名前 (例: 太郎)';
  nameInput.value = name;
  nameInput.className = 'child-name';

  const ageInput = document.createElement('input');
  ageInput.type = 'number';
  ageInput.placeholder = '年齢 (例: 5)';
  ageInput.value = age;
  ageInput.min = 0;
  ageInput.max = 18;
  ageInput.className = 'child-age';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '削除';
  removeBtn.onclick = () => entry.remove();

  entry.appendChild(nameInput);
  entry.appendChild(document.createTextNode(' '));
  entry.appendChild(ageInput);
  entry.appendChild(document.createTextNode(' 歳 '));
  entry.appendChild(removeBtn);

  container.appendChild(entry);
}

function saveOptions() {
  const children = [];
  const entries = document.querySelectorAll('.child-entry');
  entries.forEach(entry => {
    const name = entry.querySelector('.child-name').value;
    const age = entry.querySelector('.child-age').value;
    if (name || age) {
      children.push({ name, age });
    }
  });

  const subjectMode = document.getElementById('subject-mode').value;
  const apiKey = document.getElementById('api-key').value;
  const isPaid = document.getElementById('is-paid').checked;

  chrome.storage.local.set({ 
    children: children,
    subjectMode: subjectMode,
    apiKey: apiKey,
    isPaid: isPaid
  }, () => {
    const message = document.getElementById('save-message');
    message.style.display = 'block';
    setTimeout(() => {
      message.style.display = 'none';
    }, 2000);
  });
}

function restoreOptions() {
  chrome.storage.local.get(['children', 'subjectMode', 'apiKey', 'isPaid'], (result) => {
    if (result.apiKey) {
      document.getElementById('api-key').value = result.apiKey;
    }
    if (result.subjectMode) {
      document.getElementById('subject-mode').value = result.subjectMode;
    }
    if (result.isPaid) {
      document.getElementById('is-paid').checked = result.isPaid;
    }
    if (result.children && result.children.length > 0) {
      result.children.forEach(child => {
        addChildEntry(child.name, child.age);
      });
    } else {
      addChildEntry(); // default empty entry
    }
  });
}else {
      addChildEntry(); // default empty entry
    }
  });
}