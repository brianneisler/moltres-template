/**
 * Checks if `any` is `null` or `undefined`.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `any` is nullish, else `false`.
 * @example
 *
 * anyIsNil(null)
 * // => true
 *
 * anyIsNil(void 0)
 * // => true
 *
 * anyIsNil(NaN)
 * // => false
 */
const anyIsNil = (any) => any == null

export default anyIsNil
