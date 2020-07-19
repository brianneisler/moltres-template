import {
  assoc,
  assocPath,
  isArray,
  isString,
  resolveToGenerator,
  shallowEquals
} from '../utils/lang'

import createFactory from './createFactory'
import getContext from './getContext'

/**
 * This method adds properties from context based on the selector
 *
 * @func
 * @param {string|function} selector The selector to retrive data from context objext
 * @return {function} The new handler wrapped in the higher order withContext method
 * @example
 *
 * // current context object is { foo: 'bar', bim: 'bop'}
 * const handler = withContext('foo')((context) => {
 *   console.log(context) // { foo: 'bar' }
 * })
 *
 * // current context object is { foo: 'bar', bim: 'bop'}
 * const handler = withContext((context) => ({
 *   bim: context.bim
 * }))((context) => {
 *   console.log(context) // { bim: 'bop' }
 * })
 */
const withContext = (selector = null) => {
  let prevProps
  return (factory) =>
    createFactory(function* (props, ...rest) {
      let nextContext = yield* getContext(selector)

      // NOTE BRN: the above method selects the value
      // in order to merge we need to rebuild the object first

      if (isString(selector)) {
        nextContext = assoc(selector, nextContext, {})
      }
      if (isArray(selector)) {
        nextContext = assocPath(selector, nextContext, {})
      }
      const nextProps = {
        ...props,
        ...nextContext
      }

      // resuse the original props instance in this case, this way any calls to
      // memoized methods using context will result in cache hits intead of misses
      if (shallowEquals(prevProps, nextProps)) {
        return yield* resolveToGenerator(factory(prevProps, ...rest))
      }
      prevProps = nextProps
      return yield* resolveToGenerator(factory(nextProps, ...rest))
    })
}

export default withContext
