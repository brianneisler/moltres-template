import Immutable from 'immutable'

/**
 * Returns `true` if `any` is an `ImmutableSet`, or any of its subclasses.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is an `ImmutableSet`, or any of its subclasses.
 * @example
 *
 * anyIsImmutableSet([])
 * //=> false
 *
 * anyIsImmutableSet({})
 * //=> false
 *
 * anyIsImmutableSet(ImmutableMap())
 * //=> false
 *
 * anyIsImmutableSet(ImmutableSet())
 * //=> true
 *
 * anyIsImmutableSet(ImmutableStack())
 * //=> false
 */
const anyIsImmutableSet = Immutable.isSet

export default anyIsImmutableSet
