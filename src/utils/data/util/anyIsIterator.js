import anyIsFunction from './anyIsFunction'

/**
 * Checks if `any` is an `Iterator`. An `Iterator` is classified as having a property named `next` that is a function.
 *
 * Note, this method returns `true` for async Iterators.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an Iterator
 * @example
 *
 * const array = []
 * anyIsIterator(array[Symbol.iterator])
 * //=> true
 *:
 * anyIsIterator({
 *   next: () => {}
 * })
 * //=> true
 */
const anyIsIterator = (value) => value != null && anyIsFunction(value.next)

export default anyIsIterator
