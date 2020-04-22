import { buffers } from 'redux-saga'

/**
 * @function
 * @param {Number} limit
 * @returns {Buffer}
 */
const slidingBuffer = (limit) => buffers.sliding(limit)

export default slidingBuffer
