import Function from '../classes/Function'

const { toString } = Function.prototype

/**
 * Returns a string representing the function.
 *
 * See [Function.prototype.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString) for more information
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Function} func The function to convert to a string
 * @returns {string} A string representing the object.
 *
 * functionToString(function () {})
 * //=> 'function () {}'
 */
const functionToString = (func) => toString.call(func)

export default functionToString
