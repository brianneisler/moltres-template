import { assoc, isArray, isString } from 'moltres-utils'
import call from './call'
import getContext from './getContext'
import createFactory from './createFactory'

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
const withContext = (selector) => (factory) =>
  createFactory(function*(props, ...rest) {
    let context = yield* getContext(selector)
    // NOTE BRN: the above method selects the value
    // in order to merge we need to rebuild the object first
    if (isString(selector) || isArray(selector)) {
      context = assoc(selector, context, {})
    }
    return yield call(
      factory,
      {
        ...props,
        ...context
      },
      ...rest
    )
  })

export default withContext
