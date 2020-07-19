import anyToStringTag from './anyToStringTag'
import functionToString from './functionToString'
import objectGetPrototypeOf from './objectGetPrototypeOf'

const isFnRegex = /^\s*(?:function)?\*/

const getGeneratorFunc = () => {
  try {
    return Function('return function*() {}')()
  } catch (e) {}
}
const generatorFunc = getGeneratorFunc()
const GeneratorFunction = generatorFunc
  ? objectGetPrototypeOf(generatorFunc)
  : {}

/**
 * Checks whether a function is generator function.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param  {*} any The any to check.
 * @returns {boolean} Returns `true` if `any` is a generator function, else `false`.
 * @example
 *
 * anyIsGeneratorFunction(function*() {})
 * //=> true
 *
 * anyIsGeneratorFunction(function() {})
 * //=> false
 */
const anyIsGeneratorFunction = (any) => {
  if (typeof any !== 'function') {
    return false
  }
  if (isFnRegex.test(functionToString(any))) {
    return true
  }
  if (anyToStringTag(any) === 'GeneratorFunction') {
    return true
  }
  return objectGetPrototypeOf(any) === GeneratorFunction
}

export default anyIsGeneratorFunction
