import { ImmutableList, ImmutableMap } from '../utils/data'
import { select } from '../utils/lang'
import { selectQueryResults } from './selectors'

// NOTE BRN: A "query" in this context is not the conceptual idea of querying
// for data but instead a stored block in the state where the results are held
// and all active "watchers" which are active queries syncing to that block of
// state are held
const createQueryState = function* (queryKey) {
  const results = yield select(selectQueryResults(queryKey))
  return ImmutableMap({
    queryKey,
    // NOTE BRN: This selects the initial results in case they were provided in
    // the initial state
    results: results || {},
    watchers: ImmutableList([])
  })
}

export default createQueryState
