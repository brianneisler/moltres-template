import {
  assoc,
  dissocProp,
  getProp,
  identity,
  keys,
  mergeAll,
  omit,
  replaceWildcards,
  selectWildcards
} from '../utils/lang'
import { ImmutableMap } from '../utils/lang/classes'
import { call, mapAll } from '../utils/redux'

import createFactory from './createFactory'
import createSingleQueryFactory from './createSingleQueryFactory'

const createWildcardQueryFactory = ({
  baseFactory,
  createQuery,
  queryExtensions,
  queryOptions,
  selector,
  statePath
}) => {
  let factories = ImmutableMap({})
  return createFactory(function* (props, channel, context, ...rest) {
    let remainingFactories = factories
    const wildcardValuesGroups = selectWildcards(selector, props)
    const results = yield mapAll(function* (wildcardValues) {
      const targetStatePath = replaceWildcards(wildcardValues, statePath)
      const factoryKey = `key:${targetStatePath}`
      // NOTE BRN: We treat the path as an entire prop here
      let factory = getProp(factoryKey, factories)
      if (!factory) {
        factory = createSingleQueryFactory({
          baseFactory: identity,
          createQuery,
          queryExtensions,
          queryOptions,
          // NOTE BRN: Create a new selector based on the original that has the
          // wild card paths replaced with values from the resultGroup
          selector: replaceWildcards(wildcardValues, selector),
          // NOTE BRN: generate this value by taking the state path and
          // replacing the wild cards in it with the wildcard values from the resultGroup
          statePath: targetStatePath
        })
        factories = assoc(factoryKey, factory, factories)
      }
      remainingFactories = dissocProp(factoryKey, remainingFactories)
      return yield call(factory, props, channel, context, ...rest)
    }, wildcardValuesGroups)

    // NOTE BRN: Remove the factories that were no longer found by the selector
    factories = omit(keys(remainingFactories), factories)
    return yield call(
      baseFactory,
      mergeAll(...results),
      channel,
      context,
      ...rest
    )
  })
}

export default createWildcardQueryFactory
