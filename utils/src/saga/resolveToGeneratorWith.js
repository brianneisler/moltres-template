import curry from '../data/curry'
import isGenerator from '../data/isGenerator'
import isResolvable from './isResolvable'

const resolveToGeneratorWith = curry(function*(fn, value) {
  if (isResolvable(value)) {
    let result
    if (isGenerator(value)) {
      result = yield* value
    } else {
      result = yield value
    }
    return yield* resolveToGeneratorWith(fn, result)
  }
  return fn(value)
})

export default resolveToGeneratorWith
