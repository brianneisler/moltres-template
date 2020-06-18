import { MAX_SAFE_INTEGER } from '../constants'
import { UINT } from '../constants/Regex'

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @param {number} length [=MAX_SAFE_INTEGER] The upper bounds of a valid index.
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
  // NOTE BRN: max safe length is exactly MAX_SAFE_INTEGER since the length of an array cannot safely be greater than the max integer.
  const type = typeof any
  return (
    (type == 'number' || (type != 'symbol' && UINT.test(any))) &&
    any > -1 &&
    any % 1 == 0 &&
    any < MAX_SAFE_INTEGER
  )
}

export default anyIsIndex
