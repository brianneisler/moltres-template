import Immutable from 'immutable'

/**
 * Returns `true` if `any` is an `ImmutableStack`, or any of its subclasses.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is an `ImmutableStack`, or any of its subclasses.
 * @example
 *
 * anyIsImmutableStack([])
 * //=> false
 *
 * anyIsImmutableStack({})
 * //=> false
 *
 * anyIsImmutableStack(ImmutableMap())
 * //=> false
 *
 * anyIsImmutableStack(ImmutableSet())
 * //=> false
 *
 * anyIsImmutableStack(ImmutableStack())
 * //=> true
 */
const anyIsImmutableStack = Immutable.isStack

export default anyIsImmutableStack
