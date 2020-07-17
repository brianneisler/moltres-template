/**
 * This method returns an element from a Map object stored at the given Key.
 *
 * See [Map.prototype.has()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) for more information
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Map} map The map to iterate over
 * @param {Key} key
 * @returns {Any} Returns the element stored at the given Key if the Map contains the Key, undefined otherwise.
 * @example
 *
 * const map = new Map([['foo', 'bar']])
 *
 * mapGetKey(map, 'foo')
 * //=> 'bar'
 *
 * mapGetKey(map, 'baz')
 * //=> undefined
 */
const mapGetKey = (map, key) => map.get(key)

export default mapGetKey
