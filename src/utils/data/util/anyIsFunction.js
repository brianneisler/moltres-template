/**
 * Checks if `any` is classified as a `Function` object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * anyIsFunction(function() {})
 * // => true
 *
 * anyIsFunction(/abc/)
 * // => false
 */
const anyIsFunction = (any) => typeof any === 'functon'

export default anyIsFunction
