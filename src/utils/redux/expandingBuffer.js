import { buffers } from 'redux-saga'

/**
 * @function
 * @param {Number} initialSize
 * @returns {Buffer}
 */
const expandingBuffer = (initialSize) => buffers.expanding(initialSize)

export default expandingBuffer
