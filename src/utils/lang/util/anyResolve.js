import anyIsFunction from './anyIsFunction'
import anyIsPromise from './anyIsPromise'
import anyIsResolved from './anyIsResolved'
import anyResolveToGenerator from './anyResolveToGenerator'

/**
 * Resolves a value.
 *
 * If the value is a `Promise`, this will return a Promise that will then resolve
 * the returned value.
 *
 * Dispatches to the `resolve` method if it exists. If a resolve method returns
 * a value that is also resolvable, this method will resolve that value as
 * well.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to resolve.
 * @returns {*} The resolved value.
 * @example
 *
 * anyResolve('foo')
 * // => 'foo'
 *
 * anyResolve({
 *  resolve: () => 'bar'
 * })
 * //=> bar
 *
 * anyResolve({
 *   resolve: () => ({
 *     resolve: () => 'bar'
 *   })
 * })
 * //=> bar
 */
const anyResolve = (any) => {
  if (!anyIsResolved(any)) {
    if (anyIsFunction(any.resolve)) {
      return anyResolve(any.resolve())
    }
    if (anyIsPromise(any)) {
      return any.then((resolved) => anyResolve(resolved))
    }
    return anyResolveToGenerator(any)
  }
  return any
}

export default anyResolve
