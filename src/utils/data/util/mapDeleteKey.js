import mapClone from './mapClone'

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
 * @returns {Map}
 */
const mapDeleteKey = (map, key) => {
  if (!map.has(key)) {
    return map
  }
  const clone = mapClone(map)
  clone.delete(key)
  return clone
}

export default mapDeleteKey
