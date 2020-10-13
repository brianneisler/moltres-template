import { getProperty, omit } from '../lang'

const removeQueryObserver = (observers, key) => {
  const observer = getProperty(key, observers)
  observer.unsubscribe()
  return omit([key], observers)
}

export default removeQueryObserver
