const sendRuntimeMessage = (message) => {
  chrome.runtime.sendMessage(message)
}

export default sendRuntimeMessage
