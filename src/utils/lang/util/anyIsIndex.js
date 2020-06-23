import { Index } from '../classes'
import { MAX_SAFE } from '../constants/Integer'
import { UINT } from '../constants/Regex'

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 * @example
 *
 * anyIsIndex(0)
 * //=> true
 *
 * anyIsIndex(1)
 * //=> true
 *
 * anyIsIndex(-1)
 * //=> false
 */
const anyIsIndex = (any) => {
  if (any instanceof Index) {
    return true
  }
  // NOTE BRN: max safe length is exactly MAX_SAFE since the length of an array cannot safely be greater than the max integer.
  const type = typeof any
  return (
    (type === 'number' || (type != 'symbol' && UINT.test(any))) &&
    any > -1 &&
    any % 1 == 0 &&
    any < MAX_SAFE
  )
}

export default anyIsIndex
