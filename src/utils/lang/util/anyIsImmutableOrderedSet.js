import Immutable from 'immutable'

/**
 * Returns `true` if `any` is an `ImmutableOrderedSet`, or any of its subclasses.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is an `ImmutableOrderedSet`, or any of its subclasses.
 * @example
 *
 * anyIsImmutableOrderedSet([])
 * //=> false
 *
 * anyIsImmutableOrderedSet({})
 * //=> false
 *
 * anyIsImmutableOrderedSet(new Set())
 * //=> false
 *
 * anyIsImmutableOrderedSet(ImmutableMap())
 * //=> false
 *
 * anyIsImmutableOrderedSet(ImmutableStack())
 * //=> false
 *
 * anyIsImmutableOrderedSet(ImmutableSet())
 * //=> false
 *
 * anyIsImmutableOrderedSet(ImmutableOrderedSet())
 * //=> true
 */
const anyIsImmutableOrderedSet = Immutable.isOrderedSet

export default anyIsImmutableOrderedSet
