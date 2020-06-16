import { call, invariant } from '../utils/lang'
import { isFunction, isObject, isString } from '../utils/data'
import generateQuery from './generateQuery'
import watchQuery from './watchQuery'

const factoryAndWatchHeadQuery = function* ({
  buildQueryFactory,
  context,
  cursor,
  initialState,
  queryKey
}) {
  invariant(
    isFunction(buildQueryFactory),
    'buildQueryFactory must be a defined Function'
  )
  invariant(isObject(context), 'context must be a defined Object')
  invariant(isObject(cursor), 'cursor must be a defined Object')
  invariant(
    isFunction(buildQueryFactory),
    'buildQueryFactory must be a defined Function'
  )
  invariant(isString(queryKey), 'queryKey must be a String')

  // NOTE BRN: This ensures that the query exists in state
  yield call(generateQuery, queryKey)

  const factory = buildQueryFactory({
    queryOptions: { cursor, head: true },
    statePath: '$'
  })
  return yield call(watchQuery, {
    context,
    factory,
    initialState,
    queryKey,
    watcherOptions: {
      resultsPath: 'head'
    }
  })
}

export default factoryAndWatchHeadQuery
