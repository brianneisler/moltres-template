import { INFINITY, MAX_VALUE } from '../constants/Number'

import anyToNumber from './anyToNumber'

/**
 * Converts `any` to a finite number.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * anyToFinite(3.2)
 * //=> 3.2
 *
 * anyToFinite(Number.MIN_VALUE)
 * //=> 5e-324
 *
 * anyToFinite(Infinity)
 * //=> 1.7976931348623157e+308
 *
 * anyToFinite('3.2')
 * //=> 3.2
 */
const anyToFinite = (any) => {
  if (!any) {
    return any === 0 ? any : 0
  }
  any = anyToNumber(any)
  if (any === INFINITY || any === -INFINITY) {
    const sign = any < 0 ? -1 : 1
    return sign * MAX_VALUE
  }
  return any === any ? any : 0
}

export default anyToFinite
