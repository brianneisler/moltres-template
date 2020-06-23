import anyIsObjectLike from './anyIsObjectLike'
import anyToStringTag from './anyToStringTag'
import nodeTypes from './nodeTypes'

/* Node.js helper references. */
const nodeIsMap = nodeTypes && nodeTypes.anyIsMap

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * anyIsMap(new Map) // => true
 *
 * anyIsMap(new WeakMap) // => false
 */
const anyIsMap = nodeIsMap
  ? (any) => nodeIsMap(any)
  : (any) => anyIsObjectLike(any) && anyToStringTag(any) == 'Map'

export default anyIsMap
