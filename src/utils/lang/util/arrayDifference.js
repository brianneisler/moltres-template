import ImmutableSet from '../classes/ImmutableSet'

/**
 * Returns an `Array` of all elements in the first `Array` not contained in the
 * second `Array`.
 *
 * @private
 * @function
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
const arrayDifference = (array, second) => {
  const result = []
  const { length } = array
  const filterSet = ImmutableSet(second)

  let idx = 0
  while (idx < length) {
    if (!filterSet.has(array[idx])) {
      result.push(array[idx])
    }
    idx += 1
  }
  return result
}

export default arrayDifference
