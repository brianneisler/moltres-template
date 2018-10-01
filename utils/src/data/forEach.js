import curry from './curry'
import defn from './defn'
import iterate from './iterate'
import pipe from './pipe'

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
 * Also note that, unlike `Array.prototype.forEach`, this `forEach` returns
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
 * // logs 6
 * // logs 7
 * // logs 8
 */
const forEach = curry(
  defn('forEach', (fn, collection) =>
    pipe(
      () =>
        iterate(
          (next) =>
            pipe(
              (pNext) => {
                if (pNext.done) {
                  return pNext
                }
                return fn(pNext.value, pNext.kdx, collection)
              },
              () => next
            )(next),
          collection
        ),
      () => collection
    )()
  )
)

export default forEach
