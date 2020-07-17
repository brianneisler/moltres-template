import anyIsObjectLike from './anyIsObjectLike'
import anyToStringTag from './anyToStringTag'
import nodeTypes from './nodeTypes'

/* Node.js helper references. */
const nodeIsDate = nodeTypes && nodeTypes.anyIsDate

/**
 * Checks if `any` is classified as a `Date` object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * anyIsDate(new Date)
 * //=> true
 *
 * anyIsDate('Mon April 23 2012')
 * //=> false
 */
const anyIsDate = nodeIsDate
  ? (any) => nodeIsDate(any)
  : (any) => anyIsObjectLike(any) && anyToStringTag(any) == 'Date'

export default anyIsDate
