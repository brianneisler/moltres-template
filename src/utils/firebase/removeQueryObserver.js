import { getProp, omit } from '../lang'

const removeQueryObserver = (observers, key) => {
  const observer = getProp(key, observers)
  observer.unsubscribe()
  return omit([key], observers)
}

export default removeQueryObserver
