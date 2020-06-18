import { call, invariant } from '../utils/redux'
import { identity, isFunction, isObject, isString } from '../utils/lang'
import createQueryFactoryBuilder from './createQueryFactoryBuilder'
import generateQuery from './generateQuery'
import watchQuery from './watchQuery'

const factoryAndWatchQuery = function* ({
  context,
  createQuery,
  enhancer,
  initialState,
  queryKey,
  queryExtensions = {},
  queryOptions = {},
  watcherOptions = {}
}) {
  invariant(isObject(context), 'context must be a defined Object')
  invariant(isFunction(createQuery), 'createQuery must be a defined Function')
  invariant(isObject(initialState), 'initialState must be a defined Object')
  invariant(isString(queryKey), 'queryKey must be a String')
  invariant(
    isObject(queryExtensions),
    'queryExtensions must be a defined Object'
  )
  invariant(isObject(queryOptions), 'queryOptions must be a defined Object')
  invariant(isObject(watcherOptions), 'watcherOptions must be a defined Object')

  // NOTE BRN: This ensures that the query exists in state
  yield call(generateQuery, queryKey)

  // TODO BRN: Not sure that the buildQueryFactory and queryFactory makes the
  // most sense here. Perhaps this makes more sense to move up a layer and to be
  // passed in to the factoryAndWatchQuery method
  const buildQueryFactory = createQueryFactoryBuilder({
    createQuery,
    enhancer,
    factory: identity
  })

  const factory = buildQueryFactory({
    queryExtensions,
    queryOptions,
    statePath: '$'
  })
  return yield call(watchQuery, {
    context,
    factory,
    initialState,
    queryKey,
    watcherOptions
  })
}

export default factoryAndWatchQuery
