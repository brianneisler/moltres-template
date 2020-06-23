import Array from '../classes/Array'

/**
 * Checks if `any` is classified as an `Array` object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is an array, else `false`.
 * @example
 *
 * anyIsArray([1, 2, 3])
 * //=> true
 *
 * anyIsArray(document.body.children)
 * //=> false
 *
 * anyIsArray('abc')
 * //=> false
 *
 * anyIsArray(noop)
 * //=> false
 */
const anyIsArray = Array.isArray

export default anyIsArray
