/**
 * Returns a value from the Array stored at the specified Index.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Array} array The Array on which to get the Index.
 * @param {Index} index The Index to get.
 * @returns {Any} The value at the specified Index on the Array. Undefined if the Array does not have the Index.
 * @example
 * const array = ['foo']
 *
 * arrayGetIndex(array, 0)
 * //=> 'foo'
 *
 * arrayGetIndex(array, 1)
 * //=> undefined
 */
const arrayGetIndex = (array, index) => array[index]

export default arrayGetIndex
