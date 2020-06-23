import Immutable from 'immutable'

/**
 * Returns `true` if `any` is an `ImmutableList`, or any of its subclasses.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is an `ImmutableList`, or any of its subclasses.
 * @example
 *
 * anyIsImmutableList([])
 * //=> false
 *
 * anyIsImmutableList({})
 * //=> false
 *
 * anyIsImmutableList(ImmutableMap())
 * //=> false
 *
 * anyIsImmutableList(ImmutableList())
 * //=> true
 *
 * anyIsImmutableList(ImmutableStack())
 * //=> false
 */
const anyIsImmutableList = (any) => Immutable.isList(any)

export default anyIsImmutableList
