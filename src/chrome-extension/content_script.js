import { InitContentScriptAction } from './background/modules/content_script/schemas'
import setupChromeExtensionContentScript from './content_script/setupChromeExtensionContentScript'

console.log('content_script running')

const listener = (message) => {
  if (message.type === InitContentScriptAction.name) {
    chrome.runtime.onMessage.removeListener(listener)
    setupChromeExtensionContentScript(message.payload)
  }
}
chrome.runtime.onMessage.addListener(listener)
