import Object from '../classes/Object'

/**
 * Returns an array of all symbol properties found directly upon a given object.
 *
 * See [Object.getOwnPropertySymbols()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) for more information
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Object} object The object whose symbol properties are to be returned.
 * @returns {Array} An array of all symbol properties found directly upon the given object.
 *
 * const object1 = {}
 * const a = Symbol('a')
 * const b = Symbol.for('b')
 *
 * object1[a] = 'localSymbol'
 * object1[b] = 'globalSymbol'
 *
 * const objectSymbols = objectGetOwnPropertySymbols(object1)
 *
 * console.log(objectSymbols.length)
 * //=>  2
 */
const objectGetOwnPropertySymbols = (object) => {
  if (typeof Object.getOwnPropertySymbols === 'function') {
    return Object.getOwnPropertySymbols(object)
  }
  return []
}

export default objectGetOwnPropertySymbols
