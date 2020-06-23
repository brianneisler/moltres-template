import anyIsObjectLike from './anyIsObjectLike'
import anyToStringTag from './anyToStringTag'
import nodeTypes from './nodeTypes'

/* Node.js helper references. */
const nodeIsSet = nodeTypes && nodeTypes.anyIsSet

/**
 * Checks if `any` is classified as a `Set` object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * anyIsSet(new Set())
 * // => true
 *
 * anyIsSet(new WeakSet())
 * // => false
 */
const anyIsSet = nodeIsSet
  ? (any) => nodeIsSet(any)
  : (any) => anyIsObjectLike(any) && anyToStringTag(any) == 'Set'

export default anyIsSet
