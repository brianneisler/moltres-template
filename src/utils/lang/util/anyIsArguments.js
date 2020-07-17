import anyIsObjectLike from './anyIsObjectLike'
import anyToStringTag from './anyToStringTag'

/**
 * Checks if `any` is likely an `arguments` object.
 *
 * @private
 * @function
 * @category lang.util
 * @since v0.1.0
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is an `arguments` object, else `false`.
 * @example
 *
 * anyIsArguments(function() { return arguments }())
 * // => true
 *
 * anyIsArguments([1, 2, 3])
 * // => false
 */
const anyIsArguments = (any) => anyIsObjectLike(any) && anyToStringTag(any) == 'Arguments'

export default anyIsArguments
