import {
  assoc,
  identity,
  isFunction,
  isNumber,
  isObject,
  isString
} from '../utils/lang'
import { call, invariant, put, select } from '../utils/redux'
import { selectCursorResults, selectQueryCursorNext } from './selectors'
import {
  setQueryAction,
  setQueryCursorAction,
  setQueryCursorNextAction
} from './actions'
import createQueryFactoryBuilder from './createQueryFactoryBuilder'
import factoryAndWatchPageQuery from './factoryAndWatchPageQuery'
import generateQuery from './generateQuery'
import watchPaginatedQuery from './watchPaginatedQuery'

const factoryAndWatchPaginatedQuery = function* ({
  context,
  createQuery,
  enhancer,
  initialState,
  pageSize,
  queryKey
}) {
  invariant(isObject(context), 'context must be a defined Object')
  invariant(isFunction(createQuery), 'createQuery must be a defined Function')
  invariant(isObject(initialState), 'initialState must be a defined Object')
  invariant(isNumber(pageSize), 'pageSize must be a Number')
  invariant(isString(queryKey), 'queryKey must be a String')

  // NOTE BRN: This ensures that the query exists in state
  let query = yield call(generateQuery, queryKey)

  const buildQueryFactory = createQueryFactoryBuilder({
    createQuery,
    enhancer,
    factory: identity
  })

  // NOTE BRN: This is called by an action handler in the `query` module
  const nextPage = function* () {
    const nextCursor = yield select(selectQueryCursorNext(queryKey))

    // If we don't have a nextCursor then we don't have a full page and we're
    // not ready to make a new query.
    if (!nextCursor) {
      return null
    }

    // set the next query cursor to the current one and then set the next query
    // cursor to null. This will later be set by the watchPaginatedQuery method
    yield put([
      setQueryCursorAction({ cursor: nextCursor, queryKey }),
      setQueryCursorNextAction({ cursor: null, queryKey })
    ])
    // increment cursor to nextPage and trigger new query
    yield call(factoryAndWatchPageQuery, {
      buildQueryFactory,
      context,
      cursor: nextCursor,
      initialState,
      pageSize,
      queryKey
    })

    return yield select(selectCursorResults(queryKey, nextCursor))
  }

  query = assoc('nextPage', nextPage, query)
  yield put(setQueryAction({ query, queryKey }))

  return yield call(watchPaginatedQuery, {
    buildQueryFactory,
    context,
    createQuery,
    initialState,
    pageSize,
    queryKey
  })
}

export default factoryAndWatchPaginatedQuery
