export {}
export const KEY = "openapi_viewer"
chrome.runtime.onMessage.addListener((req) => {
  chrome.storage.local.set({
    [KEY]: req
  })
})
chrome.webNavigation.onHistoryStateUpdated.addListener((ev) => {
  if (ev.url.includes("/blob/")) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "open_dialog_box" })
    })
  }
})
