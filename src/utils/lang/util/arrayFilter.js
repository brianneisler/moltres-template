import Array from '../classes/Array'

const { filter } = Array.prototype

/**
 * This method creates a new `Array` with all elements that pass the test implemented by the provided function.
 *
 * See [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) for more information
 *
 * @private
 * @function
 * @since v0.2.0
 * @category lang.util
 * @template T
 * @param {T[]} array The array to iterate over.
 * @param {(value: T, index: Number, array:Array) => Boolean} predicate The function to execute for each element
 * @returns {T[]} A new Array with the values that passed the given predicate test
 * @example
 *
 * const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']
 *
 * const result = arrayFilter(words, (word) => word.length > 6)
 *
 * console.log(result)
 * // => expected output: Array ["exuberant", "destruction", "present"]
 */
const arrayFilter = (array, predicate) => filter.call(array, predicate)

export default arrayFilter
