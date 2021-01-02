const executeTabScript = async ({ filePath, frameId, tabId }) =>
  new Promise((resolve) => {
    chrome.tabs.executeScript(
      tabId,
      {
        file: filePath,
        frameId
      },
      resolve
    )
  })

export default executeTabScript
