import Array from '../classes/Array'

const { keys } = Array.prototype

/**
 * This method returns a new Array Iterator object that contains the keys for each index in the array.
 *
 * See [Array.prototype.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys) for more information
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @template T
 * @param {[]} array The array whose indexes to iterate over.
 * @returns {Iterator<Index>} Iterator of the Array's Indexes
 * @example
 *
 * const array1 = ['a', 'b', 'c'];
 * const iterator = array1.keys();
 *
 * for (const key of iterator) {
 *   console.log(key)
 * }
 * // => expected output: 0
 * // => expected output: 1
 * // => expected output: 2
 */
const arrayKeys = (array, func) => keys.call(array, func)

export default arrayKeys
