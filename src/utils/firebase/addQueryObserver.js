import { assoc, hasProperty } from '../lang'

const addQueryObserver = (observers, key, query, observer) => {
  if (hasProperty(key, observers)) {
    throw new Error(
      `observer already present for prop ${key}. Something must have gone wrong in withQuery`
    )
  }
  observer.unsubscribe = query.onSnapshot(observer)
  return assoc(key, observer, observers)
}

export default addQueryObserver
