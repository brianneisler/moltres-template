import anyIsObjectLike from './anyIsObjectLike'
import anyToStringTag from './anyToStringTag'
import objectGetPrototypeOf from './objectGetPrototypeOf'

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1
 * }
 *
 * anyIsPlainObject(new Foo)
 * //=> false
 *
 * anyIsPlainObject([1, 2, 3])
 * //=> false
 *
 * anyIsPlainObject({ 'x': 0, 'y': 0 })
 * //=> true
 *
 * anyIsPlainObject(Object.create(null))
 * //=> true
 */
const anyIsPlainObject = (any) => {
  if (!anyIsObjectLike(any) || anyToStringTag(any) != 'Object') {
    return false
  }
  if (objectGetPrototypeOf(any) === null) {
    return true
  }
  let proto = any
  while (objectGetPrototypeOf(proto) !== null) {
    proto = objectGetPrototypeOf(proto)
  }
  return objectGetPrototypeOf(any) === proto
}

export default anyIsPlainObject
