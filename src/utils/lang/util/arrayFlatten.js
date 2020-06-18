import anyIsArray from './anyIsArray'

/**
 * Returns a new array by pulling every item out of it (and all its sub-arrays) and putting them in a new array, depth-first.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Array} array The array to consider.
 * @returns {Array} The flattened list.
 * @example
 *
 * arrayFlatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
const arrayFlatten = (list, recur = arrayFlatten) => {
  const result = []
  const ilen = list.length
  let idx = 0
  while (idx < ilen) {
    const item = list[idx]
    if (anyIsArray(item) && list !== item) {
      const value = recur ? recur(item, recur) : item
      let idxj = 0
      const jlen = value.length
      while (idxj < jlen) {
        result[result.length] = value[idxj]
        idxj += 1
      }
    } else {
      result[result.length] = list[idx]
    }
    idx += 1
  }
  return result
}

export default arrayFlatten
