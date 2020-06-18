import anyIdenticalWithAny from './anyIdenticalWithAny'
import mapClone from './mapClone'
import mapGetKey from './mapGetKey'
import mapHasKey from './mapHasKey'

/**
 * Deletes a `Key` from a `Map`. Returns a new copy of the `Map` with the `Key`
 * removed.
 *
 * @private
 * @function
 * @immutable
 * @pure
 * @param {Map} map
 * @param {Key} key
 * @param {Any} value
 * @returns {Map}
 */
const mapSetKey = (map, key, value) => {
  if (mapHasKey(map, key) && anyIdenticalWithAny(mapGetKey(map, key), value)) {
    return map
  }
  const clone = mapClone(map)
  clone.set(key, value)
  return clone
}

export default mapSetKey
