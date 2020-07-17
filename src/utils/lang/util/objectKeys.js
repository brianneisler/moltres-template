import Object from '../classes/Object'

/**
 * Returns a list containing the names of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent across different JS platforms.
 *
 * Note: known bugs with the Object.keys method are addressed using the core-js polyfill provided by babel
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Object} object The object to extract properties from
 * @returns {Array} An array of the object's own properties.
 * @example
 *
 * objectKeys({a: 1, b: 2, c: 3})
 * //=> ['a', 'b', 'c']
 */
const objectKeys = Object.keys

export default objectKeys
