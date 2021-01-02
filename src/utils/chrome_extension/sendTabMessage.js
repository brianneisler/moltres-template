const sendTabMessage = ({ frameId, tabId }, message) =>
  chrome.tabs.sendMessage(tabId, message, {
    frameId
  })

export default sendTabMessage
