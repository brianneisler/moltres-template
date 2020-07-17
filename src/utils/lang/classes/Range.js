import Immutable from 'immutable'

/**
 * Returns a Seq.Indexed of numbers from start (inclusive) to end (exclusive), by step, where start defaults to 0, step to 1, and end to infinity. When start is equal to end, returns empty range.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util.js
 * @param {?number} start The start number for the Seq
 * @param {?number} end The end number for the Seq
 * @param {?number} step The amount to increment for each step in the Seq
 * @returns {Seq.Indexed} A new Indexed Seq
 * @example
 */
const { Range } = Immutable

export default Range
