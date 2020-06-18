import { call, put, select } from '../utils/redux'
import { selectQuery } from './selectors'
import { setQueryAction } from './actions'
import createQueryState from './createQueryState'

// NOTE BRN: A "query" in this context is not the conceptual idea of querying
// for data but instead a stored block in the state where the results are held
// and all active "watchers" which are active queries syncing to that block of
// state are held
const generateQuery = function* (queryKey) {
  let query = yield select(selectQuery(queryKey))
  if (!query) {
    query = yield call(createQueryState, queryKey)
    // Store query
    yield put(setQueryAction({ query, queryKey }))
  }
  return query
}

export default generateQuery
