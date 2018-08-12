import curry from './curry'
import getProp from './getProp'
import hasProp from './hasProp'

/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @func
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array} path The path to use.
 * @param {Object} obj The object to check the path in.
 * @return {Boolean} Whether the path exists.
 * @example
 *
 *      has(['a', 'b'], {a: {b: 2}})          // => true
 *      has(['a', 'b'], {a: {b: undefined}})  // => true
 *      has('a.b', {a: {c: 2}})               // => false
 *      hasPath([], {})                           // => true
 */
const hasPath = curry((path, obj) => {
  if (path.length === 0) {
    return !!obj
  }
  let val = obj
  let idx = 0
  while (idx < path.length) {
    if (hasProp(path[idx], val)) {
      val = getProp(path[idx], val)
      idx += 1
    } else {
      return false
    }
  }
  return true
})

export default hasPath
