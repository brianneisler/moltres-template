import objectDefineProperty from './objectDefineProperty'

/**
 * Defines `length` for the given `func`
 *
 * Note: This mutates `func`
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Function} func The function to define the length of.
 * @param {Number} length The length of the function parameters.
 * @return {Function} The `func` function.
 * @example
 *
 * const result = functionDefineLength(function(abc) {}, 2)
 * result.length
 * //=> 2
 */
const functionDefineLength = (func, length) => {
  objectDefineProperty(func, 'length', {
    configurable: true,
    value: length
  })
  return func
}

export default functionDefineLength
