import objectToString from './objectToString'

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} value The value to test
 * @returns {string}
 * @example
 *
 * anyToStringTag({})
 * //=> 'Object'
 *
 * anyToStringTag(1)
 * //=> 'Number'
 *
 * anyToStringTag(false)
 * //=> 'Boolean'
 *
 * anyToStringTag('s')
 * //=> 'String'
 *
 * anyToStringTag(null)
 * //=> 'Null'
 *
 * anyToStringTag([])
 * //=> 'Array'
 *
 * toType(/[A-z]/)
 * //=> 'RegExp'
 *
 * anyToStringTag(() => {})
 * //=> 'Function'
 *
 * anyToStringTag(undefined)
 * //=> 'Undefined'
 */
const anyToStringTag = (any) => {
  return any === null
    ? 'Null'
    : any === undefined
    ? 'Undefined'
    : objectToString(any).slice(8, -1)
}

export default anyToStringTag
