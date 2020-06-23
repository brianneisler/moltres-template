/**
 * The Function constructor creates a new Function object. Calling the constructor directly can create functions dynamically, but suffers from security and similar (but far less significant) performance issues to eval. However, unlike eval, the Function constructor creates functions which execute in the global scope only.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util.js
 * @param {...string} argN Names to be used by the function as formal argument names. Each must be a string that corresponds to a valid JavaScript identifier or a list of such strings separated with a comma; for example "x", "theValue", or "a,b".
 * @param {string} functionBody A string containing the JavaScript statements comprising the function definition.
 * @returns {function} A new function
 * @example
 *
 */
const _Function = Function

export default _Function
