import deferredPromise from './deferredPromise'

const listPromise = (values = []) => {
  let promises = values
  const promise = deferredPromise()
  const { resolve } = promise

  const push = (value) => {
    promises.push(value)
  }

  promise.resolve = () => {
    if (promises.length === 0) {
      return resolve([])
    }
    return resolve(Promise.all(promises))
  }
  promise.push = push
  promise.reject = null

  return promise
}

export default listPromise
