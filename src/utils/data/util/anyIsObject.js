/**
 * Checks if `any` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * anyIsObject({})
 * // => true
 *
 * anyIsObject([1, 2, 3])
 * // => true
 *
 * anyIsObject(function () {})
 * // => true
 *
 * anyIsObject(null)
 * // => false
 */
const anyIsObject = (any) => {
  const type = typeof any
  return any != null && (type == 'object' || type == 'function')
}

export default anyIsObject
