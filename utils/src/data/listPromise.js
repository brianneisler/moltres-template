import append from './append'
import deferredPromise from './deferredPromise'
import isEmpty from './isEmpty'

const listPromise = (values = []) => {
  let promises = values
  const promise = deferredPromise()
  const { resolve } = promise

  const push = (value) => {
    promises = append(value, promises)
  }

  promise.resolve = () => {
    if (isEmpty(promises)) {
      return resolve([])
    }
    return resolve(Promise.all(promises))
  }
  promise.push = push
  promise.reject = null

  return promise
}

export default listPromise
