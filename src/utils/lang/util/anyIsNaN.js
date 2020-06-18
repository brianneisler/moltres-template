import anyIsNumber from './anyIsNumber'

/**
 * Checks if `any` is `NaN`.
 *
 * **Note:** This method is based on [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as global [`isNaN`](https://mdn.io/isNaN) which returns `true` for `undefined` and other non-number values.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 * @example
 *
 * anyIsNaN(NaN)
 * // => true
 *
 * anyIsNaN(new Number(NaN))
 * // => true
 *
 * anyIsNaN(undefined)
 * // => false
 */
const anyIsNaN = (any) => {
  // An `NaN` primitive is the only value that is not equal to itself.
  // Perform the `toStringTag` check first to avoid errors with some
  // ActiveX objects in IE.
  return anyIsNumber(any) && any != +any
}

export default anyIsNaN
