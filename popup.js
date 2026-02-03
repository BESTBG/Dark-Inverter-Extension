document.addEventListener('DOMContentLoaded', () => {
  const pageToggle = document.getElementById('pageToggle');
  const imageToggle = document.getElementById('imageToggle');
  const statusLabel = document.getElementById('status');

  async function initializePopup() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://')) {
      disableExtension("Unavailable on this page");
      return;
    }

    try {
      const response = await chrome.tabs.sendMessage(tab.id, { action: "getState" });
      if (response) {
        pageToggle.checked = response.pageInversion;
        imageToggle.checked = response.imageInversion;
      }
    } catch (err) {
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
        const response = await chrome.tabs.sendMessage(tab.id, { action: "getState" });
        if (response) {
          pageToggle.checked = response.pageInversion;
          imageToggle.checked = response.imageInversion;
        }
      } catch (injectionErr) {
        disableExtension("Failed to load");
      }
    }
  }

  function disableExtension(reason) {
    pageToggle.disabled = true;
    imageToggle.disabled = true;
    statusLabel.textContent = reason;
  }

  async function updateTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      try {
        await chrome.tabs.sendMessage(tab.id, {
          action: "updateState",
          pageInversion: pageToggle.checked,
          imageInversion: imageToggle.checked
        });
      } catch (err) {}
    }
  }

  pageToggle.addEventListener('change', updateTab);
  imageToggle.addEventListener('change', updateTab);

  initializePopup();
});
