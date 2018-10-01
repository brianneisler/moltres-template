import arrayIteratorAtIndex from './arrayIteratorAtIndex'
import curry from './curry'
import defn from './defn'
import find from './find'
import isArrayLike from './isArrayLike'

/**
 * Returns the first element of the list which matches the predicate, or `undefined` if no element matches starting at the given index.
 *
 * Dispatches to the `findAtIndex` method of the last argument if present.
 *
 * Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.
 *
 * @func
 * @category data
 * @param {Function} fn The predicate function used to determine if the element is the desired one.
 * @param {integer} index The index to start at.
 * @param {array} list The array to consider.
 * @returns {*|Promise|Generator} The element found, or `undefined`.
 * @example
 *
 * const xs = [{a: 1}, {a: 2}, {a: 3}];
 * findAtIndex(propEq('a'), 0)(xs) //=> {a: 2}
 * findAtIndex(propEq('a', 2), 2)(xs) //=> undefined
 */
const findAtIndex = curry(
  defn('findAtIndex', (fn, index, list) => {
    if (!isArrayLike(list)) {
      throw new Error('list paramter must be array like')
    }
    return find(fn, arrayIteratorAtIndex(list, index))
  })
)

export default findAtIndex
