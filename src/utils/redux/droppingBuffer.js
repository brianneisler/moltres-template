import { buffers } from 'redux-saga'

/**
 * @function
 * @param {Number} limit
 * @returns {Buffer}
 */
const droppingBuffer = (limit) => buffers.dropping(limit)

export default droppingBuffer
