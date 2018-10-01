import any from './any'
import arrayIteratorAtIndex from './arrayIteratorAtIndex'
import curry from './curry'
import defn from './defn'
import isArrayLike from './isArrayLike'

/**
 * Returns `true` if at least one of elements of the list match the predicate starting at the given index, `false` otherwise.
 *
 * Dispatches to the `anyAtIndex` method of the list argument, if present.
 *
 * Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.
 *
 * @func
 * @category data
 * @param {Function} fn The predicate function.
 * @param {integer} index The index to start at.
 * @param {array} list The array to consider.
 * @returns {boolean|Promise|Generator} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @example
 *
 * const lessThan0 = flip(lt)(0)
 * const lessThan2 = flip(lt)(2)
 * any(lessThan0)([1, 2]) //=> false
 * any(lessThan2)([1, 2]) //=> true
 */
const anyAtIndex = curry(
  defn('anyAtIndex', (fn, index, list) => {
    if (!isArrayLike(list)) {
      throw new Error('list paramter must be array like')
    }
    return any(fn, arrayIteratorAtIndex(list, index))
  })
)

export default anyAtIndex
