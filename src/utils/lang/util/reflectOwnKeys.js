import Reflect from '../classes/Reflect'

/**
 * Returns an array of the target object's own property keys. Its return value is equivalent to ``Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))``.
 *
 * Note: known bugs with the Reflect.ownKeys method or lack of support are addressed using the core-js polyfill provided by babel
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Object} target The target object from which to get the own keys.
 * @returns {Array} An Array of the target object's own property keys.
 * @example
 *
 * reflectOwnKeys({z: 3, y: 2, x: 1}) // [ "z", "y", "x" ]
 * reflectOwnKeys([]) // ["length"]
 */
const reflectOwnKeys = Reflect.ownKeys

export default reflectOwnKeys
