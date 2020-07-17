import Immutable from 'immutable'

/**
 * Returns `true` if `any` is an `ImmutableCollection`, or any of its subclasses.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is an `ImmutableCollection`, or any of its subclasses.
 * @example
 *
 * anyIsImmutableCollection([])
 * //=> false
 *
 * anyIsImmutableCollection({})
 * //=> false
 *
 * anyIsImmutableCollection(ImmutableMap())
 * //=> true
 *
 * anyIsImmutableCollection(ImmutableList())
 * //=> true
 *
 * anyIsImmutableCollection(ImmutableStack())
 * //=> true
 */
const anyIsImmutableCollection = Immutable.isCollection

export default anyIsImmutableCollection
