import anyIsFunction from './anyIsFunction'
import anyIsGenerator from './anyIsGenerator'
import anyIsResolved from './anyIsResolved'
import unresolvedResolveToGenerator from './unresolvedResolveToGenerator'

/**
 * Resolves a value to a generator using the generator to yield values. When the
 * generator is complete the fn method is executed with the final result.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to resolve with the generator
 * @param {Function} func The function to execute at the end of the generator's resolution
 * @returns {Generator}
 * @example
 *
 * const generator = anyResolveToGeneratorWith(
 *   (resolvedValue) => {
 *     //=> 'foo'
 *   },
 *   'foo'
 * )
 * generator.next()
 * //=> { done: true } triggers the fn method
 */
const anyResolveToGeneratorWith = function* (any, func) {
  if (!anyIsResolved(any)) {
    let result
    if (anyIsGenerator(any)) {
      result = yield* any
    } else if (anyIsFunction(any.resolve)) {
      result = any.resolve()
    } else {
      // Must be either a Promise or an Op
      result = yield any
    }
    return yield* anyResolveToGeneratorWith(result, func)
  }
  any = func(any)
  if (!anyIsResolved(any)) {
    return yield* unresolvedResolveToGenerator(any)
  }
  return any
}

export default anyResolveToGeneratorWith
