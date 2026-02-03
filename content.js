let pageInversion = false;
let imageInversion = false;

function applyStyles() {
  document.documentElement.style.filter = pageInversion ? "invert(1)" : "";
  
  // Handle image inversion with a dynamic style tag
  let styleTag = document.getElementById('dark-inverter-img-styles');
  if (imageInversion) {
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dark-inverter-img-styles';
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = "img { filter: invert(1) !important; }";
  } else if (styleTag) {
    styleTag.remove();
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateState") {
    pageInversion = request.pageInversion;
    imageInversion = request.imageInversion;
    applyStyles();
  } else if (request.action === "getState") {
    sendResponse({ 
      pageInversion: pageInversion,
      imageInversion: imageInversion 
    });
  }
});
