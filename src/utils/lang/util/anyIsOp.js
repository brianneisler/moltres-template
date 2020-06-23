import Op from '../classes/Op'

/**
 * Determines if `any` is an Op.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check
 * @returns {boolean}
 * @example
 *
 * anyIsOp(new Op(fn))
 * //=> true
 *
 * anyIsOp({
 *   ['@@redux-saga/IO']: 'op'
 * })
 * //=> true
 */
const anyIsOp = (any) =>
  !!(any && (any instanceof Op || any['@@redux-saga/IO']))

export default anyIsOp
