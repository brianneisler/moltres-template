import anyToFinite from './anyToFinite'

/**
 * Converts `any` to an Integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * anyToInteger(3.2)
 * // => 3
 *
 * anyToInteger(Number.MIN_VALUE)
 * // => 0
 *
 * anyToInteger(Infinity)
 * // => 1.7976931348623157e+308
 *
 * anyToInteger('3.2')
 * // => 3
 */
const anyToInteger = (any) => {
  const result = anyToFinite(any)
  const remainder = result % 1

  return remainder ? result - remainder : result
}

export default anyToInteger
