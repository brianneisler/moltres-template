/**
 * Checks if `any` is a key.
 *
 * @function
 * @since v0.1.0
 * @category lang
 * @param {*} any The value to check.
 * @param {Keyed} keyed The keyed value to query keys on.
 * @returns {boolean} Returns `true` if `value` is a key
 * @example
 *
 * anyIsKey('foo')
 * //=> true
 *
 * anyIsKey(123)
 * //=> true
 *
 * anyIsKey(true)
 * //=> true
 *
 * anyIsKey(null)
 * //=> true
 *
 * anyIsKey(undefined)
 * //=> true
 *
 * anyIsKey(Symbol('abc'))
 * //=> true
 *
 * anyIsKey(Symbol.for('foo'))
 * //=> true
 *
 * anyIsKey([])
 * //=> false
 *
 * anyIsKey({})
 * //=> false
 */
const anyIsKey = () => true

export default anyIsKey
