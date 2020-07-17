import anyToStringTag from './anyToStringTag'

/**
 * Checks if `any` is classified as a `Symbol` primitive or object.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is a symbol, else `false`.
 * @example
 *
 * anyIsSymbol(Symbol.iterator)
 * // => true
 *
 * anyIsSymbol(Symbol('abc'))
 * // => true
 *
 * anyIsSymbol(Symbol.for('abc'))
 * // => true
 *
 * anyIsSymbol('abc')
 * // => false
 */
const anyIsSymbol = (any) => {
  const type = typeof any
  return (
    type == 'symbol' ||
    (type == 'object' && any != null && anyToStringTag(any) == 'Symbol')
  )
}

export default anyIsSymbol
