/**
 * This method converts an `Iterator` into an `Array`
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Iterator} iterator The Iterator to convert to an Array
 * @returns {Array} An `Array` of all the values from the `Iterator`
 * @example
 */
const iteratorToArray = (iter) => {
  const list = []
  let next
  while (!(next = iter.next()).done) {
    list.push(next.value)
  }
  return list
}

export default iteratorToArray
