import Promise from 'bluebird'

const deferredPromise = () => {
  let reject
  let resolve

  const promise = new Promise((promiseResolve, promiseReject) => {
    reject = promiseReject
    resolve = promiseResolve
  })

  promise.reject = reject
  promise.resolve = resolve
  return promise
}

export default deferredPromise
