import anyIsObjectLike from './anyIsObjectLike'
import anyToStringTag from './anyToStringTag'

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * anyIsBoolean(false)
 * // => true
 *
 * anyIsBoolean(null)
 * // => false
 */
const anyIsBoolean = (any) =>
  any === true ||
  any === false ||
  (anyIsObjectLike(any) && anyToStringTag(any) == 'Boolean')

export default anyIsBoolean
