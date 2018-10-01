import curry from './curry'
import defn from './defn'
import isArrayLike from './isArrayLike'
import iterateAll from './iterateAll'
import keys from './keys'

/**
 * Iterate over an input calling a provided function `fn` for each element in the collection .
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @param {Function} fn The function to invoke. Receives two arguments, `value` and either `index` for arrays or `key` for objects.
 * @param {Array} collection The collection to iterate over.
 * @returns {*} The original collection.
 * @example
 *
 * const printXPlusFive = x => console.log(x + 5);
 * forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb forEach(f, [a, b, c]) = [a, b, c]
 */
const forEachAll = curry(
  defn('forEachAll', (fn, collection) => {
    if (isArrayLike(collection)) {
      return iterateAll(
        ({ value, idx }) => ({
          await: true,
          value: fn(value, idx, collection)
        }),
        collection
      )
    }
    // TODO BRN: Add support for iterators
    return iterateAll(
      ({ value }) => ({
        await: true,
        value: fn(collection[value], value, collection)
      }),
      keys(collection)
    )
  })
)

export default forEachAll
