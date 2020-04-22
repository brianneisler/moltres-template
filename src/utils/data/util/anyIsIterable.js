import { SYMBOL_ITERATOR } from '../constants'

/**
 * Checks if `any` implements the iterator symbol or is iterable
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is iterable, else `false`.
 * @example
 *
 * anyIsIterable('abc')
 * //=> true
 *
 * anyIsIterable(new Map())
 * //=> true
 *
 * anyIsIterable({})
 * //=> false
 *
 * anyIsIterable([])
 * //=> true
 */
const anyIsIterable = (any) => any != null && any[SYMBOL_ITERATOR] != null

export default anyIsIterable
