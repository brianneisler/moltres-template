import { Seq as baseSeq } from 'immutable'

/**
 * Seq describes a lazy operation, allowing them to efficiently chain use of all the higher-order collection methods (such as map and filter) by not creating intermediate collections.
 *
 * ```
 * type Seq<K, V> extends Collection<K, V>
 * ```
 *
 * Seq is immutable — Once a Seq is created, it cannot be changed, appended to, rearranged or otherwise modified. Instead, any mutative method called on a Seq will return a new Seq.
 *
 * Seq is lazy — Seq does as little work as necessary to respond to any method call. Values are often created during iteration, including implicit iteration when reducing or converting to a concrete data structure such as a List or JavaScript Array.
 *
 * For example, the following performs no work, because the resulting Seq's values are never iterated:
 *
 * ```
 * const { Seq } = require('immutable')
 * const oddSquares = Seq([ 1, 2, 3, 4, 5, 6, 7, 8 ])
 *   .filter(x => x % 2 !== 0)
 *   .map(x => x * x)
 * ```
 *
 * Once the Seq is used, it performs only the work necessary. In this example, no intermediate arrays are ever created, filter is called three times, and map is only called once:
 *
 * ```
 * oddSquares.get(1)
 * //=> 9
 * ```
 *
 * Any collection can be converted to a lazy Seq with Seq().
 *
 * ```
 * const { Map } = require('immutable')
 * const map = Map({ a: 1, b: 2, c: 3 }
 * const lazySeq = Seq(map)
 * ```
 *
 * Seq allows for the efficient chaining of operations, allowing for the expression of logic that can otherwise be very tedious:
 *
 * ```
 * lazySeq
 *   .flip()
 *   .map(key => key.toUpperCase())
 *   .flip()
 * //=> Seq { A: 1, B: 1, C: 1 }
 * ```
 *
 * As well as expressing logic that would otherwise seem memory or time limited, for example Range is a special kind of Lazy sequence.
 *
 * ```
 * const { Range } = require('immutable')
 * Range(1, Infinity)
 *   .skip(1000)
 *   .map(n => -n)
 *   .filter(n => n % 2 === 0)
 *   .take(2)
 *   .reduce((r, n) => r * n, 1)
 * //=> 1006008
 * ```
 *
 * Seq is often used to provide a rich collection API to JavaScript Object.
 *
 * ```
 * Seq({ x: 0, y: 1, z: 2 }).map(v => v * 2).toObject();
 * //=> { x: 0, y: 2, z: 4 }
 * ```
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util.js
 * @param {*} value
 * @returns {Seq} A new Seq
 * @example
 */
const Seq = baseSeq

export default Seq
