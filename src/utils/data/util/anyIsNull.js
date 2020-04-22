/**
 * Checks if `any` is `null`.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is `null`, else `false`.
 * @example
 *
 * anyIsNull(null)
 * // => true
 *
 * anyIsNull(void 0)
 * // => false
 */
const anyIsNull = (any) => any === null

export default anyIsNull
