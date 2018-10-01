import isGenerator from '../data/isGenerator'
import isResolvable from './isResolvable'

const resolveToGenerator = function*(value) {
  if (isResolvable(value)) {
    let result
    if (isGenerator(value)) {
      result = yield* value
    } else {
      result = yield value
    }
    return yield* resolveToGenerator(result)
  }
  return value
}

export default resolveToGenerator
