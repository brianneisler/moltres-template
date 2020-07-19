import anyIsNumber from './anyIsNumber'
import anyToInteger from './anyToInteger'

/**
 * Determine if the given value is an integer.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} value The value to check.
 * @returns {Boolean} Returns `true` if `any` is an integer, else `false`.
 * @example
 *
 * anyIsInteger(3)
 * // => true
 *
 * anyIsInteger(new Number(3))
 * // => true
 *
 * anyIsInteger(3.2)
 * // => false

 * anyIsInteger(Number.MIN_VALUE)
 * // => false
 *
 * anyIsInteger(Infinity)
 * // => false
 *
 * anyIsInteger(NaN)
 * // => false
 *
 * anyIsInteger('3')
 * // => false
 */
const anyIsInteger = (value) =>
  anyIsNumber(value) && value == anyToInteger(value)

export default anyIsInteger
