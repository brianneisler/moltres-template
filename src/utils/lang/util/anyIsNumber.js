import anyIsObjectLike from './anyIsObjectLike'
import anyToStringTag from './anyToStringTag'

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `Number.isFinite` method.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * anyIsNumber(3)
 * // => true
 *
 * anyIsNumber(Number.MIN_VALUE)
 * // => true
 *
 * anyIsNumber(Infinity)
 * // => true
 *
 * anyIsNumber('3')
 * // => false
 */
const anyIsNumber = (value) =>
  typeof value == 'number' ||
  (anyIsObjectLike(value) && anyToStringTag(value) == 'Number')

export default anyIsNumber
