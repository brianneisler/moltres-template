import anyIsGenerator from './anyIsGenerator'
import anyIsOp from './anyIsOp'
import anyIsPromise from './anyIsPromise'
import anyResolveWith from './anyResolveWith'
import generatorResolveToGeneratorWith from './generatorResolveToGeneratorWith'
import opResolveToGeneratorWith from './opResolveToGeneratorWith'

/**
 * Resolves an unresolved value to the given method.
 *
 * If the value to be resolved is a promise then this method will return a promise. The fn method will be triggered once the promise resolves.
 *
 * If the value to be resolved is a generator, this method will return a generator.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to resolve with the generator
 * @param {Function} func The function to execute at the end of the resolution
 * @returns {Generator}
 * @example
 *
 * await unresolvedResolveWith(
 *   Promise.resolve('foo'),
 *   (resolvedValue) => 'bar' // resolvedValue == 'foo'
 * )
 * //=> 'bar'
 */
const unresolvedResolveWith = (unresolved, func) => {
  if (anyIsPromise(unresolved)) {
    return unresolved.then((resolved) => anyResolveWith(resolved, func))
  }
  if (anyIsGenerator(unresolved)) {
    return generatorResolveToGeneratorWith(unresolved, func)
  }
  if (anyIsOp(unresolved)) {
    return opResolveToGeneratorWith(unresolved, func)
  }
  return anyResolveWith(unresolved.resolve(), func)
}

export default unresolvedResolveWith
