import { assoc, isArray, isString } from 'moltres-utils'
import call from './call'
import getConfig from './getConfig'
import createFactory from './createFactory'

/**
 * This method adds properties from config based on the selector
 *
 * @func
 * @param {string|function} selector The selector to retrive data from config objext
 * @return {function} The new handler wrapped in the higher order withConfig method
 * @example
 *
 * // current config object is { foo: 'bar', bim: 'bop'}
 * const handler = withConfig('foo')((config) => {
 *   console.log(config) // { foo: 'bar' }
 * })
 *
 * // current config object is { foo: 'bar', bim: 'bop'}
 * const handler = withConfig((config) => ({
 *   bim: config.bim
 * }))((config) => {
 *   console.log(config) // { bim: 'bop' }
 * })
 */
const withConfig = (selector) => (factory) =>
  createFactory(function*(props, ...rest) {
    let config = yield* getConfig(selector)
    // NOTE BRN: the above method selects the value
    // in order to merge we need to rebuild the object first
    if (isString(selector) || isArray(selector)) {
      config = assoc(selector, config, {})
    }
    return yield call(
      factory,
      {
        ...props,
        ...config
      },
      ...rest
    )
  })

export default withConfig
