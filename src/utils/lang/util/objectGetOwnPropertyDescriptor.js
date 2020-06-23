import Object from '../classes/Object'

/**
 * Returns a property descriptor for an own property
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {object} object The object to get the property from
 * @param {string} prop The prop to get from the object
 * @returns {{
 *   configurable: boolean,
 *   enumerable: boolean,
 *   value: *,
 *   writeable: boolean,
 *   get: () => *,
 *   set: (value) => undefined
 * }} The property descriptor
 * @example
 *
 * const object = { get foo() { return 17 } }
 * objectGetOwnPropertyDescriptor(object, 'foo')
 * //=> {
 * //   configurable: true,
 * //   enumerable: true,
 * //   get: foo() { ... },
 * //   set: undefined
 * // }
 */
const objectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

export default objectGetOwnPropertyDescriptor
