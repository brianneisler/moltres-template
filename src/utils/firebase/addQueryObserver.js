import { assocProp, hasProp } from '../data'

const addQueryObserver = (observers, key, query, observer) => {
  if (hasProp(key, observers)) {
    throw new Error(
      `observer already present for prop ${key}. Something must have gone wrong in withQuery`
    )
  }
  observer.unsubscribe = query.onSnapshot(observer)
  return assocProp(key, observer, observers)
}

export default addQueryObserver
