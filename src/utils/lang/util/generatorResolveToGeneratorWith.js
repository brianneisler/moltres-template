import anyResolveToGeneratorWith from './anyResolveToGeneratorWith'

/**
 * Resolves a Generator to a Generator yielding all values of the Generator to
 * the new one.
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
const generatorResolveToGeneratorWith = function* (any, func) {
  const result = yield* any
  return yield* anyResolveToGeneratorWith(result, func)
}

export default generatorResolveToGeneratorWith
