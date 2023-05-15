import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import { loadAndBundleSpec } from "redoc"

export const config: PlasmoCSConfig = {
  matches: ["https://github.com/*"]
}
const validate = async (spec: string) => {
  try {
    await loadAndBundleSpec(spec)
    return undefined
  } catch (error) {
    return error.message
  }
}

export const syncSpec = () => {
  const isValidExtension = () => {
    return location.href.includes("json") || location.href.includes("yaml")
  }
  const code = document.querySelector("textarea[aria-label='file content']")
  if (!isValidExtension() || !code?.textContent) {
    return
  }
  const maybeYmlOrJson = code.textContent
  validate(maybeYmlOrJson).then(() => {
    const message = {
      url: location.href,
      spec: maybeYmlOrJson
    }
    chrome.runtime.sendMessage(message)
  })
}
syncSpec()
chrome.runtime.onMessage.addListener((req) => {
  syncSpec()
  return true
})
