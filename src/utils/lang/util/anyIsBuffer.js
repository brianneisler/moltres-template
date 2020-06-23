import anyIsFunction from './anyIsFunction'

/**
 * Checks if `any` is a buffer.
 *
 * @private
 * @function
 * @immutable
 * @pure
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * anyIsBuffer(new Buffer(2))
 * // => true
 *
 * anyIsBuffer(new Uint8Array(2))
 * // => false
 */
const anyIsBuffer = (any) =>
  any != null && anyIsFunction(any.fill) && anyIsFunction(any.write)

export default anyIsBuffer
