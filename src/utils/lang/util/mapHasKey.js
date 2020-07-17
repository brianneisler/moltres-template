/**
 * This method returns a boolean indicating whether an element with the specified key exists or not.
 *
 * See [Map.prototype.has()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) for more information
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Map} map The map to iterate over
 * @param {Key} key
 * @returns {Boolean} Returns true if the Map contains the Key, false otherwise.
 * @example
 *
 * const map = new Map([['foo', 'bar']])
 *
 * mapHasKey(map, 'foo')
 * //=> true
 */
const mapHasKey = (map, key) => map.has(key)

export default mapHasKey
