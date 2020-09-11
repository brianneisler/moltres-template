import { call, put, select } from '../utils/redux'

import { setQueryAction } from './actions'
import createQueryState from './createQueryState'
import { selectQuery } from './selectors'

// NOTE BRN: A "query" in this context is not the conceptual idea of querying
// for data but instead a stored block in the state where the results are held
// and all active "watchers" which are active queries syncing to that block of
// state are held
const generateQuery = function* (context, queryKey) {
  let query = yield select(selectQuery(queryKey))
  if (!query) {
    query = yield call(createQueryState, queryKey)
    // Store query
    yield put(setQueryAction(context, { query, queryKey }))
  }
  return query
}

export default generateQuery
