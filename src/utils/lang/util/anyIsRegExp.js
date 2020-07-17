import anyIsObjectLike from './anyIsObjectLike'
import anyToStringTag from './anyToStringTag'
import nodeTypes from './nodeTypes'

/* Node.js helper references. */
const nodeIsRegExp = nodeTypes && nodeTypes.isRegExp

/**
 * Checks if `any` is classified as a `RegExp` object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * anyIsRegExp(/abc/)
 * //=> true
 *
 * anyIsRegExp('/abc/')
 * //=> false
 */
const anyIsRegExp = nodeIsRegExp
  ? nodeIsRegExp
  : (any) => anyIsObjectLike(any) && anyToStringTag(any) == 'RegExp'

export default anyIsRegExp
