import { deferredPromise } from 'moltres-utils'
import resolve from './resolve'

const doResolve = function*(value, promise) {
  try {
    const result = yield* resolve(value)
    promise.resolve(result)
  } catch (error) {
    promise.reject(error)
  }
}

const resolveToPromise = (value) => {
  const promise = deferredPromise()
  const resolver = doResolve(value, promise)
  resolver.promise = promise
  return resolver
}

export default resolveToPromise
