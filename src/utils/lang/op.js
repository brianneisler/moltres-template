import Op from './classes/Op'

/**
 * Creates an op object that can be yielded by a generator and intercepted/executed by any generator middleware
 *
 * @function
 * @since v0.1.0
 * @category common
 * @param {Function} fn The function to execute when the op is executed
 * @returns {Object} The op object
 */
const op = (fn) => new Op(fn)

export default op
