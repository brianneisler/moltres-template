import Immutable from 'immutable'

/**
 * Returns `true` if `any` is an `ImmutableMap`, or any of its subclasses.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is an `ImmutableMap`, or any of its subclasses.
 * @example
 *
 * anyIsImmutableMap([])
 * //=> false
 *
 * anyIsImmutableMap({})
 * //=> false
 *
 * anyIsImmutableMap(ImmutableMap())
 * //=> true
 *
 * anyIsImmutableMap(ImmutableList())
 * //=> false
 *
 * anyIsImmutableMap(ImmutableStack())
 * //=> false
 */
const anyIsImmutableMap = Immutable.isMap

export default anyIsImmutableMap
