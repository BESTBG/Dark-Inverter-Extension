# Dark Inverter Chrome Extension

**Dark Inverter** is a premium Chrome extension that provides a powerful and stylish way to toggle color inversion on any website. Designed with a modern glassmorphism aesthetic, it offers granular control over your browsing experience.

## 🚀 Features

- **Dual Controls**: Indepenently toggle inversion for the entire **Page** or specifically for **Images**.
- **Tab Isolation**: Each tab maintains its own independent state. Enabling inversion on one site won't affect others.
- **Premium UI**: A sleek, dark-themed popup featuring vibrant gradients and smooth toggle animations.
- **Intelligent Handling**: Gracefully disables itself on restricted pages (like `chrome://` settings or the Web Store).

## 🛠️ Installation (Developer Mode)

1.  Download or clone this repository to your local machine.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  In the top-right corner, enable the **Developer mode** toggle.
4.  Click the **Load unpacked** button.
5.  Select the `Dark Inverter Extension` folder from your file system.

## 📁 File Structure

- `manifest.json`: Defines extension metadata, permissions (`activeTab`, `scripting`), and entry points.
- `popup.html`: The HTML structure for the extension's interface.
- `popup.css`: Premium styling with glassmorphism effects and custom toggle switches.
- `popup.js`: Manages the UI state and communicates with the content script using the Chrome Tabs API.
- `content.js`: The engine that applies the `filter: invert(1)` CSS style to the document and image tags.

## ⚙️ How it Works

The extension uses Chrome's `scripting` and `activeTab` permissions to inject a content script into the active page. This script monitors for messages from the popup and applies CSS filters dynamically:

- **Page Inversion**: Applied directly to the `<html>` node.
- **Image Inversion**: Injected via a dynamic `<style>` tag to ensure all current and future images on the page are targeted with priority (`!important`).

## 📄 License

This project is open-source and available under the MIT License.
