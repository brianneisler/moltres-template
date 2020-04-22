import { getProp, omit } from '../data'

const removeQueryObserver = (observers, key) => {
  const observer = getProp(key, observers)
  observer.unsubscribe()
  return omit([key], observers)
}

export default removeQueryObserver
