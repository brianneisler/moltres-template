import curry from '../common/curry'
import defn from '../common/defn'
import isArrayLike from '../lang/isArrayLike'

/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @function
 * @since v0.0.10
 * @category data
 * @param {*} list The array like value to inspect.
 * @return {Number} The length of the list.
 * @example
 *
 * length([]) //=> 0
 * length([1, 2, 3]) //=> 3
 */
const length = curry(
  defn('length', (list) => {
    if (!isArrayLike(list)) {
      throw new TypeError(`length method expects list to be ArrayLike. Instead received ${list}`)
    }
    return list.length
  })
)

export default length
