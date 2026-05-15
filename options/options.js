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

  chrome.storage.local.set({ children: children }, () => {
    const message = document.getElementById('save-message');
    message.style.display = 'block';
    setTimeout(() => {
      message.style.display = 'none';
    }, 2000);
  });
}

function restoreOptions() {
  chrome.storage.local.get(['children', 'subjectMode'], (result) => {
    if (result.subjectMode) {
      document.getElementById('subject-mode').value = result.subjectMode;
    }
    if (result.children && result.children.length > 0) {
      result.children.forEach(child => {
        addChildEntry(child.name, child.age);
      });
    } else {
      addChildEntry(); // default empty entry
    }
  });
}