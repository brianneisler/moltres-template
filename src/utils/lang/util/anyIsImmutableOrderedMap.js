import Immutable from 'immutable'

/**
 * Returns `true` if `any` is an `ImmutableOrderedMap`, or any of its subclasses.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is an `ImmutableOrderedMap`, or any of its subclasses.
 * @example
 *
 * anyIsImmutableOrderedMap([])
 * //=> false
 *
 * anyIsImmutableOrderedMap({})
 * //=> false
 *
 * anyIsImmutableOrderedMap(new Map())
 * //=> false
 *
 * anyIsImmutableOrderedMap(ImmutableMap())
 * //=> false
 *
 * anyIsImmutableOrderedMap(ImmutableStack())
 * //=> false
 *
 * anyIsImmutableOrderedMap(ImmutableOrderedMap())
 * //=> true
 */
const anyIsImmutableOrderedMap = Immutable.isOrderedMap

export default anyIsImmutableOrderedMap
