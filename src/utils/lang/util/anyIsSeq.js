import Immutable from 'immutable'

/**
 * Returns `true` if `any` is a `Seq`.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is a `Seq`.
 * @example
 *
 * anyIsSeq([])
 * //=> false
 *
 * anyIsSeq({})
 * //=> false
 *
 * anyIsSeq(ImmutableMap())
 * //=> false
 *
 * anyIsSeq(Seq())
 * //=> true
 */
const anyIsSeq = Immutable.isSeq

export default anyIsSeq
