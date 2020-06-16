import anyIsArray from './anyIsArray'
import anyToStringTag from './anyToStringTag'

/**
 * Checks if `any` is classified as a `String` primitive or object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is a string, else `false`.
 * @example
 *
 * anyIsString('abc')
 * // => true
 *
 * anyIsString(new String('abc'))
 * // => true
 *
 * anyIsString(1)
 * // => false
 */
const anyIsString = (any) => {
  const type = typeof any
  return (
    type == 'string' ||
    (type == 'object' &&
      any != null &&
      !anyIsArray(any) &&
      anyToStringTag(any) == 'String')
  )
}

export default anyIsString
