import {
  ImmutableMap,
  anyContainsWildcard,
  assocPath,
  assocProp,
  createPath,
  createSelector,
  dissocProp,
  equals,
  getProp,
  identity,
  isSelector,
  join,
  keys,
  map,
  mapAll,
  mergeAll,
  omit,
  reduce,
  replacePropWildcards,
  replaceWildcards,
  select,
  selectWildcards,
  weakMemoize
} from '../utils/data'
import { call } from '../utils/lang'
import createFactory from './createFactory'

const createPropFactory = weakMemoize((selector, propBuilders, baseFactory) => {
  let builtProps = {}
  let selectedProps = null
  const memoizedPropBuilders = map(weakMemoize, propBuilders)

  return createFactory(function* (props, channel, context, ...rest) {
    const nextSelectedProps = select(selector, props)
    if (!equals(nextSelectedProps, selectedProps)) {
      builtProps = yield mapAll(
        (builder) => builder(context, nextSelectedProps),
        memoizedPropBuilders
      )
      selectedProps = nextSelectedProps
    }
    props = reduce(
      (accum, builtPropKey) =>
        assocPath(createPath(builtPropKey), getProp(builtPropKey, builtProps), accum),
      props,
      keys(builtProps)
    )
    return yield call(baseFactory, props, channel, context, ...rest)
  })
})

const createWildcardPropFactory = (selector, propBuilders, baseFactory) => {
  let factories = ImmutableMap({})
  return createFactory(function* (props, ...rest) {
    let remainingFactories = factories
    const wildcardValuesGroups = selectWildcards(selector, props)
    const results = yield mapAll(function* (wildcardValues) {
      const targetPropBuilders = replacePropWildcards(wildcardValues, propBuilders)
      const factoryKey = join(':', keys(targetPropBuilders))
      let factory = getProp(factoryKey, factories)
      if (!factory) {
        factory = createPropFactory(
          replaceWildcards(wildcardValues, selector),
          targetPropBuilders,
          identity
        )
        factories = assocProp(factoryKey, factory, factories)
      }
      remainingFactories = dissocProp(factoryKey, remainingFactories)
      return yield call(factory, props, ...rest)
    }, wildcardValuesGroups)

    factories = omit(keys(remainingFactories), factories)
    return yield call(baseFactory, mergeAll(...results), ...rest)
  })
}

const withSelectedProps = (selector, propBuilders = {}) => (baseFactory) => {
  if (!isSelector(selector)) {
    selector = createSelector(selector)
  }
  const propPaths = keys(propBuilders)
  if (anyContainsWildcard(propPaths)) {
    return createWildcardPropFactory(selector, propBuilders, baseFactory)
  }
  return createPropFactory(selector, propBuilders, baseFactory)
}

export default withSelectedProps
