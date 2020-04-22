import anyIsObject from './anyIsObject'
import anyToStringTag from './anyToStringTag'

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
const anyIsFunction = (any) => {
  if (!anyIsObject(any)) {
    return false
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  const tag = anyToStringTag(any)
  return tag == 'Function' || tag == 'AsyncFunction' || tag == 'GeneratorFunction' || tag == 'Proxy'
}

export default anyIsFunction
