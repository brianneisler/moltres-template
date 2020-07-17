import { buffers } from 'redux-saga'

/**
 * @function
 * @param {number} limit
 * @returns {Buffer}
 */
const fixedBuffer = (limit) => buffers.fixed(limit)

export default fixedBuffer
