import Buffer from './Buffer'

/**
 * Checks if `value` is a buffer.
 *
 * @function
 * @since v0.0.3
 * @category buffer
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * isBuffer(new Buffer(2)) // => true
 *
 * isBuffer(new Uint8Array(2)) // => false
 */
const isBuffer = Buffer.isBuffer

export default isBuffer
