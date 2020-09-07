import {
  invariant,
  isFunction,
  isNumber,
  isObject,
  isString,
  last
} from '../utils/lang'
import { call, put, select } from '../utils/redux'

import { setQueryCursorNextAction } from './actions'
import generateQuery from './generateQuery'
import { selectQueryCursor } from './selectors'
import watchQuery from './watchQuery'

const factoryAndWatchPageQuery = function* ({
  buildQueryFactory,
  context,
  cursor,
  initialState,
  pageSize,
  queryKey
}) {
  invariant(
    isFunction(buildQueryFactory),
    'buildQueryFactory must be a defined Function'
  )
  invariant(isObject(context), 'context must be a defined Object')
  invariant(isObject(cursor), 'cursor must be a defined Object')
  invariant(isObject(initialState), 'initialState must be a defined Object')
  invariant(isNumber(pageSize), 'pageSize must be a Number')
  invariant(isString(queryKey), 'queryKey must be a String')

  // NOTE BRN: This ensures that the query exists in state
  yield call(generateQuery, context, queryKey)

  const factory = buildQueryFactory({
    queryExtensions: {
      *onSnapshot(snapshot) {
        const currentCursor = yield select(selectQueryCursor(queryKey))
        // If this query is still the most recent query then we can store
        // the latest cursor. We also check if we've reached the expected
        // page size here. If we're not at the expected page size then there
        // is no "nextQuery" yet since we haven't reached the correct page size.
        if (currentCursor === cursor) {
          if (snapshot.docs.length === pageSize) {
            yield put(
              setQueryCursorNextAction(context, {
                cursor: last(snapshot.docs),
                queryKey
              })
            )
          }
        }
      }
    },
    queryOptions: { cursor, limit: pageSize },
    statePath: '$'
  })
  return yield call(watchQuery, {
    context,
    factory,
    initialState,
    queryKey,
    watcherOptions: {
      resultsPath: cursor.id
    }
  })
}

export default factoryAndWatchPageQuery
