import isNumber from './isNumber'

/**
 * Checks if `value` is `NaN`.
 *
 * **Note:** This method is based on [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as global [`isNaN`](https://mdn.io/isNaN) which returns `true` for `undefined` and other non-number values.
 *
 * @function
 * @since v0.0.13
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 * @example
 *
 * isNaN(NaN)
 * // => true
 *
 * isNaN(new Number(NaN))
 * // => true
 *
 * isNaN(undefined)
 * // => false
 */
const isNaN = (value) => {
  // An `NaN` primitive is the only value that is not equal to itself.
  // Perform the `toStringTag` check first to avoid errors with some
  // ActiveX objects in IE.
  return isNumber(value) && value != +value
}

export default isNaN
