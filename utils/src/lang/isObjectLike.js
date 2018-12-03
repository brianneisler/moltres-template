/**
 * Checks if `value` is object-like. A value is object-like if it's not `null` and has a `typeof` result of "object".
 *
 * @function
 * @since v0.0.3
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * isObjectLike({}) // => true
 *
 * isObjectLike([1, 2, 3]) // => true
 *
 * isObjectLike(Function) // => false
 *
 * isObjectLike(null) // => false
 */
const isObjectLike = (value) => typeof value == 'object' && value !== null

export default isObjectLike
