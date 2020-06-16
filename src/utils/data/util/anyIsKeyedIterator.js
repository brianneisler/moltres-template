import anyIsFunction from './anyIsFunction'
import anyIsIterator from './anyIsIterator'

/**
 * Checks if `any` is a KeyedIterator. A KeyedIterator is classified as having a
 * property named `next` that is a plain function and a property named `getKey`
 * that returns the current key.
 *
 * @function
 * @since v0.1.0
 * @category lang
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is a KeyedIterator
 * @example
 *
 * const object = {}
 * anyIsKeyedIterator(objectToIterator(object))
 * //=> true
 *
 * const array = []
 * anyIsKeyedIterator(arrayLikeToIterator(array))
 * //=> false
 *
 * anyIsKeyedIterator({
 *   next: () => {},
 *   getKey: () => {}
 * })
 * //=> true
 */
const anyIsKeyedIterator = (any) =>
  anyIsIterator(any) && anyIsFunction(any.getKey)

export default anyIsKeyedIterator
