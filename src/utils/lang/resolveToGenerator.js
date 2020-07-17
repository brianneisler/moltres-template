import curry from './curry'
import { anyResolveToGenerator } from './util'

/**
 * Resolves a value to a generator using the generator to yield values.
 *
 * @function
 * @since v0.0.16
 * @category common
 * @param {*} value The value to resolve with the generator
 * @returns {Generator}
 * @example
 *
 * const generator = resolveToGenerator('foo')
 * generator.next() //=> { value: 'foo', done: true }
 */
const resolveToGenerator = curry(anyResolveToGenerator)

export default resolveToGenerator
