import all from './all'
import deferredPromise from './deferredPromise'

const listPromise = (values = []) => {
  const promise = deferredPromise()
  const { reject, resolve } = promise
  promise.promises = values

  promise.push = function (value) {
    this.promises.push(value)
    return this
  }

  promise.resolve = function () {
    all(this.promises)
      .then((results) => {
        resolve(results)
      })
      .catch((error) => reject(error))
  }
  return promise
}

export default listPromise
