import deferredPromise from './deferredPromise'
import resolveToGenerator from './resolveToGenerator'

const doResolve = function* (value, promise) {
  try {
    const result = yield* resolveToGenerator(value)
    promise.resolve(result)
  } catch (error) {
    promise.reject(error)
  }
}

const resolveToResolver = (value) => {
  const promise = deferredPromise()
  const resolver = doResolve(value, promise)
  resolver.promise = promise
  return resolver
}

export default resolveToResolver
