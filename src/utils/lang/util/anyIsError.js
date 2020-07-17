import anyIsObjectLike from './anyIsObjectLike'
import anyIsPlainObject from './anyIsPlainObject'
import anyToStringTag from './anyToStringTag'

/**
 * Checks if `any` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is an `Error` object, else `false`.
 * @example
 *
 * anyIsError(new Error)
 * // => true
 *
 * anyIsError(Error)
 * // => false
 */
const anyIsError = (any) => {
  if (!anyIsObjectLike(any)) {
    return false
  }
  const tag = anyToStringTag(any)
  return (
    tag == 'Error' ||
    tag == 'DOMException' ||
    (typeof any.message == 'string' &&
      typeof any.name == 'string' &&
      !anyIsPlainObject(any))
  )
}

export default anyIsError
