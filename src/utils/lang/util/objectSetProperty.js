import anyIdenticalWithAny from './anyIdenticalWithAny'
import objectClone from './objectClone'
import objectHasOwnProperty from './objectHasOwnProperty'

/**
 * Sets a `Property` on an `Object` and returns a copy of the `Object` with the
 * `Property` set. If the property's value is set to the same value, then the
 * same instance of Object will be returned with no changes.
 *
 * @private
 * @function
 * @immutable
 * @pure
 * @since v0.1.0
 * @category lang.util
 * @param {Object} object The Object on which to set the property.
 * @param {Property} property The name or Symbol of the property to update.
 * @param {Any} value The value to set the Property to
 * @returns {Object} A copy of the Object with the Property set to the new value
 *
 * const object = {
 *   foo: 1,
 *   bar: 2
 * }
 *
 * const result = objectSetProperty(object, 'foo', 3)
 *
 * result.foo
 * //=> 3
 *
 * object.foo
 * //=> 1
 */
const objectSetProperty = (object, property, value) => {
  if (
    anyIdenticalWithAny(value, object[property]) &&
    objectHasOwnProperty(object, property)
  ) {
    return object
  }
  const clone = objectClone(object)
  clone[property] = value
  return clone
}

export default objectSetProperty
