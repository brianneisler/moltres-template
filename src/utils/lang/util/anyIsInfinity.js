import Infinity from '../classes/Infinity'

import anyIsNumber from './anyIsNumber'

/**
 * Checks if `any` is `Infinity` or `-Infinity`.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is `Infinity` or `-Infinity`, else `false`.
 * @example
 *
 * anyIsInfinity(Infinity)
 * // => true
 *
 * anyIsInfinity(-Infinity)
 * // => true
 *
 * anyIsInfinity(new Number(Infinity))
 * // => true
 *
 * anyIsInfinity(undefined)
 * // => false
 *
 * anyIsInfinity(123)
 * // => false
 */
const anyIsInfinity = (value) =>
  anyIsNumber(value) && (Infinity === +value || -Infinity === +value)

export default anyIsInfinity
