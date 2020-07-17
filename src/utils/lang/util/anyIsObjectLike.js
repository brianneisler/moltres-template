/**
 * Checks if `any` is object-like. A value is object-like if it's not `null` and has a `typeof` result of "object".
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is object-like, else `false`.
 * @example
 *
 * anyIsObjectLike({})
 * // => true
 *
 * anyIsObjectLike([1, 2, 3])
 * // => true
 *
 * anyIsObjectLike(Function)
 * // => false
 *
 * anyIsObjectLike(null)
 * // => false
 */
const anyIsObjectLike = (any) => typeof any == 'object' && any !== null

export default anyIsObjectLike
