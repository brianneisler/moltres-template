import anyIsFunction from './anyIsFunction'
import anyIsGenerator from './anyIsGenerator'
import anyResolveToGenerator from './anyResolveToGenerator'

/**
 * Resolves an unresolved value to a generator using the generator to yield values.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to resolve with the generator
 * @returns {Generator}
 * @example
 *
 * const generator = unresolvedResolveToGenerator('foo')
 * generator.next()
 * //=> { value: 'foo', done: true }
 */
const unresolvedResolveToGenerator = function* (unresolved) {
  let result
  if (anyIsGenerator(unresolved)) {
    result = yield* unresolved
  } else if (anyIsFunction(unresolved.resolve)) {
    result = unresolved.resolve()
  } else {
    // Must be either a Promise or an Op
    result = yield unresolved
  }
  return yield* anyResolveToGenerator(result)
}

export default unresolvedResolveToGenerator
