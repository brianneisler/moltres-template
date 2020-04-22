const clearHistory = (history) => {
  history.entries = []
  history.index = -1
  history.push('/')
  return history
}

export default clearHistory
