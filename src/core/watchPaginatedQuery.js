import { call, cancel, invariant, put, spawn } from '../utils/lang'
import { isFunction, isNumber, isObject, isString } from '../utils/data'
import { setQueryCursorAction } from './actions'
import factoryAndWatchFirstPageQueries from './factoryAndWatchFirstPageQueries'
import isQuery from './isQuery'
import monitorQueryChannel from './monitorQueryChannel'

const watchPaginatedQuery = function* ({
  buildQueryFactory,
  context,
  createQuery,
  initialState,
  pageSize,
  queryKey
}) {
  invariant(isFunction(buildQueryFactory), 'buildQueryFactory must be a defined Function')
  invariant(isObject(context), 'context must be a defined Object')
  invariant(isFunction(createQuery), 'createQuery must be a defined Function')
  invariant(isObject(initialState) || !initialState, 'initialState must be an Object or undefined')
  invariant(isNumber(pageSize), 'pageSize must be a Number')
  invariant(isString(queryKey), 'queryKey must be a String')

  // TODO BRN: Figure out something more efficient than this...
  // get the initial id to start the pages at
  const cursorQuery = yield call(createQuery, context, initialState, { cursor: 'init' })
  invariant(isQuery(cursorQuery), 'cursorQuery returned by createQuery must be a defined Query')

  const snap = yield cursorQuery.get()
  if (snap.docs.length > 0) {
    const cursor = snap.docs[0]
    yield put(setQueryCursorAction({ cursor, queryKey }))
    yield call(factoryAndWatchFirstPageQueries, {
      buildQueryFactory,
      context,
      cursor,
      initialState,
      pageSize,
      queryKey
    })
  } else {
    // spawn a process that watches for the first item as the cursor
    // and then kicks off the queries

    // TODO BRN: Handle the cancelation of the returned task from `spawn`
    const cursorMonitorTask = yield spawn(monitorQueryChannel, {
      onError: function* (error) {
        // TODO BRN: Figure out where to put this error to surface it to the UI
        // eslint-disable-next-line no-console
        console.error(error)
      },
      onSnapshot: function* (snapshot) {
        if (snapshot.docs && snapshot.docs.length > 0) {
          const cursor = snapshot.docs[0]
          yield put(setQueryCursorAction({ cursor, queryKey }))
          yield call(factoryAndWatchFirstPageQueries, {
            buildQueryFactory,
            context,
            cursor,
            initialState,
            pageSize,
            queryKey
          })
          yield cancel(cursorMonitorTask)
        }
      },
      query: cursorQuery
    })
  }
}

export default watchPaginatedQuery
