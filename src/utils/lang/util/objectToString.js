import Object from '../classes/Object'

const { toString } = Object.prototype

/**
 * Returns a string representing the object.
 *
 * See [Object.prototype.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) for more information
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Object} object The object to convert to a string
 * @returns {Object} A string representing the object.
 *
 * objectToString({})
 * //=> '[object Object]'
 */
const objectToString = (object) => toString.call(object)

export default objectToString
