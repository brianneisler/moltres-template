import anyIsLength from './anyIsLength'

/**
 * Checks if `any` is array-like. A value is considered array-like if it's not a function and has a `value.length` that's an integer greater than or equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * anyIsArrayLike([1, 2, 3])
 * // => true
 *
 * anyIsArrayLike(document.body.children)
 * // => true
 *
 * anyIsArrayLike('abc')
 * // => true
 *
 * anyIsArrayLike(Function)
 * // => false
 */
const anyIsArrayLike = (value) =>
  value != null && typeof value != 'function' && anyIsLength(value.length)

export default anyIsArrayLike
