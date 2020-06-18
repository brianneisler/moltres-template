import anyIsFunction from './anyIsFunction'
import anyIsGenerator from './anyIsGenerator'
import anyIsResolved from './anyIsResolved'

/**
 * Resolves a value to a generator using the generator to yield values.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to resolve with the generator
 * @returns {Generator}
 * @example
 *
 * const generator = anyResolveToGenerator('foo')
 * generator.next()
 * //=> { value: 'foo', done: true }
 */
const anyResolveToGenerator = function* (any) {
  if (!anyIsResolved(any)) {
    let result
    if (anyIsGenerator(any)) {
      result = yield* any
    } else if (anyIsFunction(any.resolve)) {
      result = any.resolve()
    } else {
      result = yield any
    }
    return yield* anyResolveToGenerator(result)
  }
  return any
}

export default anyResolveToGenerator
