import Array from '../classes/Array'

const { concat } = Array.prototype

/**
 * Concat an `Array` with one or more `Array`s.
 *
 * @private
 * @function
 * @immutable
 * @pure
 * @since v0.1.0
 * @category lang.util
 * @param {Array} array The array concat with the given values
 * @param {...*} values The values to concat to the array
 * @returns {Array} A new array with the values concatenated
 * @example
 *
 * arrayConcat(['a', 'b', 'c'], [1, 2, 3])
 * //=> ['a', 'b', 'c', 1, 2, 3]
 *
 * arrayConcat([1, 2, 3], [4, 5, 6], [7, 8, 9])
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * arrayConcat(['a', 'b', 'c'], 1, [2, 3])
 * //=> ['a', 'b', 'c', 1, 2, 3]
 */
const arrayConcat = (array, ...values) => concat.apply(array, values)

export default arrayConcat
