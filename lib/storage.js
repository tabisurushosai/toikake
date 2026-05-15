export async function saveHistory(entry) {
  const result = await chrome.storage.local.get(['history']);
  const history = result.history || [];
  history.unshift(entry);
  await chrome.storage.local.set({ history });
}

export async function getHistory() {
  const result = await chrome.storage.local.get(['history']);
  return result.history || [];
}
