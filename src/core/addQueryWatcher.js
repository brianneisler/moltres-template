import { assoc, update } from '../utils/lang'
import { put, select } from '../utils/redux'
import { selectQuery } from './selectors'
import { setQueryAction } from './actions'

const addQueryWatcher = function* (queryKey, watcher) {
  let query = yield select(selectQuery(queryKey))
  query = update(
    'watchers',
    (watchers) => assoc(watcher.id, watcher, watchers),
    query
  )
  yield put(setQueryAction({ query, queryKey }))
  return watcher
}

export default addQueryWatcher
