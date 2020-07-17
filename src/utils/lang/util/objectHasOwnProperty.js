import Object from '../classes/Object'

const { hasOwnProperty } = Object.prototype

/**
 * Returns a boolean indicating whether the object has the specified property as its own property (as opposed to inheriting it).
 *
 * See [Object.hasOwnProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) for more information
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Object} object The object on which to check for the property.
 * @param {Property} property The String name or symbol of the property to test.
 * @returns {Boolean} A boolean indicating whether or not the object has the specified property as own property.
 *
 * const object = new Object()
 * object.property1 = 42
 *
 * objectHasOwnProperty(object, 'property1')
 * //=> true
 *
 * objectHasOwnProperty(object, 'toString')
 * //=> false
 *
 * objectHasOwnProperty(object, 'hasOwnProperty')
 * //=> false
 */
const objectHasOwnProperty = (object, property) =>
  hasOwnProperty.call(object, property)

export default objectHasOwnProperty
