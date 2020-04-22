import { createMemoryHistory } from 'history'

const createHistory = (location) => {
  const initialEntries = location ? [location] : []
  return createMemoryHistory({
    initialEntries
  })
}

export default createHistory
