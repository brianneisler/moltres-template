import anyIsObjectLike from './anyIsObjectLike'
import anyToStringTag from './anyToStringTag'
import nodeTypes from './nodeTypes'

/* Node.js helper references. */
const nodeIsArrayBuffer = nodeTypes && nodeTypes.anyIsArrayBuffer

/**
 * Checks if `any` is classified as an `ArrayBuffer` object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is an array buffer, else `false`.
 * @example
 *
 * anyIsArrayBuffer(new ArrayBuffer(2))
 * // => true
 *
 * anyIsArrayBuffer(new Array(2))
 * // => false
 */
const anyIsArrayBuffer = nodeIsArrayBuffer
  ? nodeIsArrayBuffer
  : (any) => anyIsObjectLike(any) && anyToStringTag(any) == 'ArrayBuffer'

export default anyIsArrayBuffer
