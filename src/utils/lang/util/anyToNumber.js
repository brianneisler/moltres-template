import NaN from '../classes/NaN'

import anyIsFunction from './anyIsFunction'
import anyIsObject from './anyIsObject'
import anyIsSymbol from './anyIsSymbol'

/** Used to match leading and trailing whitespace. */
const reTrim = /^\s+|\s+$/g

/** Used to detect bad signed hexadecimal string values. */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

/** Used to detect binary string values. */
const reIsBinary = /^0b[01]+$/i

/** Used to detect octal string values. */
const reIsOctal = /^0o[0-7]+$/i

/** Built-in method references without a dependency on `root`. */
const freeParseInt = parseInt

/**
 * Converts `any` to a `Number`.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * anyToNumber(3.2)
 * // => 3.2
 *
 * anyToNumber(Number.MIN_VALUE)
 * // => 5e-324
 *
 * anyToNumber(Infinity)
 * // => Infinity
 *
 * anyToNumber('3.2')
 * // => 3.2
 */
const anyToNumber = (any) => {
  if (any != null && anyIsFunction(any.toNumber)) {
    return any.toNumber()
  }
  if (typeof any == 'number') {
    return any
  }
  if (anyIsSymbol(any)) {
    return NaN
  }
  if (anyIsObject(any)) {
    const other = typeof any.valueOf == 'function' ? any.valueOf() : any
    any = anyIsObject(other) ? `${other}` : other
  }
  if (typeof any != 'string') {
    return any === 0 ? any : +any
  }
  any = any.replace(reTrim, '')
  const isBinary = reIsBinary.test(any)
  return isBinary || reIsOctal.test(any)
    ? freeParseInt(any.slice(2), isBinary ? 2 : 8)
    : reIsBadHex.test(any)
    ? NaN
    : +any
}

export default anyToNumber
