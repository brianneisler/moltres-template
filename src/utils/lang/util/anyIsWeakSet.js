import anyIsObjectLike from './anyIsObjectLike'
import anyToStringTag from './anyToStringTag'

/**
 * Checks if `any` is classified as a `WeakSet` object.
 *
 * @function
 * @since v0.1.0
 * @category lang
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is a weak set, else `false`.
 * @example
 *
 * anyIsWeakSet(new WeakSet())
 * // => true
 *
 * anyIsWeakSet(new Set())
 * // => false
 */
const anyIsWeakSet = (any) =>
  anyIsObjectLike(any) && anyToStringTag(any) == 'WeakSet'

export default anyIsWeakSet
