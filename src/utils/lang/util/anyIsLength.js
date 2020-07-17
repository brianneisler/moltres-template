import { MAX_SAFE } from '../constants/Integer'

/**
 * Checks if `any` is an integer that can be a lngth for an array like value
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` can be a length.
 * @example
 *
 * anyIsLength(123)
 * //=> true
 *
 * anyIsLength(0)
 * //=> true
 *
 * anyIsLength(MAX_SAFE_INTEGER)
 * //=> true
 *
 * anyIsLength(-1)
 * // => false
 *
 * anyIsLength(1.23)
 * // => false
 *
 * anyIsLength(MAX_SAFE_INTEGER + 1)
 * //=> false
 */
const anyIsLength = (any) =>
  typeof any == 'number' && any > -1 && any % 1 == 0 && any <= MAX_SAFE

export default anyIsLength
