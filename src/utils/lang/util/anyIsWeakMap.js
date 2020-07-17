import anyIsObjectLike from './anyIsObjectLike'
import anyToStringTag from './anyToStringTag'

/**
 * Checks if `any` is classified as a `WeakMap` object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is a weak map, else `false`.
 * @example
 *
 * isWeakMap(new WeakMap())
 * // => true
 *
 * isWeakMap(new Map())
 * // => false
 */
const isWeakMap = (any) => anyIsObjectLike(any) && anyToStringTag(any) == 'WeakMap'

export default isWeakMap
