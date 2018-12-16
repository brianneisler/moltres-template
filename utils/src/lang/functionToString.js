const { toString } = Function.prototype

/**
 * Returns a string representing the function.
 *
 * See [Function.prototype.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString) for more information
 *
 * @function
 * @since v0.0.18
 * @category lang
 * @param {function} func The function to convert to a string
 * @returns {string} A string representing the object.
 *
 * functionToString(function () {})
 * //=> '[object Object]'
 */
const functionToString = (func) => toString.call(func)

export default functionToString
