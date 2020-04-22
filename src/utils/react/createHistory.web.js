import { createBrowserHistory } from 'history'

let history
const createHistory = () => {
  if (!history) {
    history = createBrowserHistory()
  }
  return history
}

export default createHistory
