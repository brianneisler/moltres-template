import Object from '../classes/Object'

/**
 * This method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
 *
 * See [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) for more information
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Object} target The target object.
 * @param {...Object} sources The source object(s).
 * @returns {Object} The target object with all the sources propeties assigned to the target.
 * @example
 *
 * const object1 = {
 *   a: 1,
 *   b: 2,
 *   c: 3
 * }
 *
 * objectAssign(object1, {c: 4, d: 5})
 * //=> {
 *   a: 1,
 *   b: 2,
 *   c: 4,
 *   d: 5
 * }
 */
const objectAssign = Object.assign

export default objectAssign
