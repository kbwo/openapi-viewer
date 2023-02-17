export const syncSpec = () => {
  const isValidExtension = () => {
    return location.href.includes("json") || location.href.includes("yaml")
  }
  const code = document.querySelector("table.js-file-line-container")
  if (!isValidExtension() || !code?.textContent) {
    return
  }
  const maybeYmlOrJson = code.textContent
  const message = {
    url: location.href,
    spec: maybeYmlOrJson
  }
  chrome.runtime.sendMessage(message)
}
