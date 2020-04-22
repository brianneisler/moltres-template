import { createMemoryHistory } from 'history'

let history
const createHistory = () => {
  if (!history) {
    history = createMemoryHistory()
  }
  return history
}

export default createHistory
