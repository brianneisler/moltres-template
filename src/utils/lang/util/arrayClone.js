import Array from '../classes/Array'

/**
 * Clones the given `array`
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Array} array The array to clone.
 * @returns {Array} Returns a clone of `array`.
 */
const arrayClone = (array) => {
  let index = -1
  const { length } = array

  const clone = Array(length)
  while (++index < length) {
    clone[index] = array[index]
  }
  return clone
}

export default arrayClone
