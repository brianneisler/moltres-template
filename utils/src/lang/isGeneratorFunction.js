import functionToString from './functionToString'
import objectToString from './objectToString'

const isFnRegex = /^\s*(?:function)?\*/
const hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'
const getProto = Object.getPrototypeOf
const getGeneratorFunc = () => {
  // eslint-disable-line consistent-return
  if (!hasToStringTag) {
    return false
  }
  return function*() {}
}
const generatorFunc = getGeneratorFunc()
const GeneratorFunction = generatorFunc ? getProto(generatorFunc) : {}

/**
 * Checks whether a function is generator function.
 *
 * @function
 * @since v0.0.3
 * @category lang
 * @param  {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a generator function, else `false`.
 * @example
 *
 * isGeneratorFunction(function*() {})  //=> true
 * isGeneratorFunction(function() {})   //=> false
 */
const isGeneratorFunction = (value) => {
  if (typeof value !== 'function') {
    return false
  }
  if (isFnRegex.test(functionToString(value))) {
    return true
  }
  if (!hasToStringTag) {
    const str = objectToString(value)
    return str === '[object GeneratorFunction]'
  }
  return getProto(value) === GeneratorFunction
}

export default isGeneratorFunction
