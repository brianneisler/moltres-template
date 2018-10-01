import curry from '../data/curry'
import isPromise from '../data/isPromise'
import isResolvable from './isResolvable'
import resolveToGeneratorWith from './resolveToGeneratorWith'

const resolveWith = curry((fn, value) => {
  if (isResolvable(value)) {
    if (isPromise(value)) {
      return value.then((resolved) => resolveWith(fn, resolved))
    }
    return resolveToGeneratorWith(fn, value)
  }
  return fn(value)
})

export default resolveWith
