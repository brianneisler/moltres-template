import objectAssign from './objectAssign'

/**
 * This method is used to copy the values of all enumerable own properties from
 * one object to a new object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Object} object The object to copy.
 * @returns {Object} The new copy of the object.
 * @example
 *
 * const object = {
 *   a: 1,
 *   b: 2,
 *   c: 3
 * }
 *
 * const objectCopy = objectClone(object)
 * //=> {
 *   a: 1,
 *   b: 2,
 *   c: 3
 * }
 *
 * objectCopy === object
 * //=> false
 */
const objectClone = (object) => objectAssign({}, object)

export default objectClone
