import { assocProp, update } from '../utils/data'
import { put, select } from '../utils/lang'
import { selectQuery } from './selectors'
import { setQueryAction } from './actions'

const addQueryWatcher = function* (queryKey, watcher) {
  let query = yield select(selectQuery(queryKey))
  query = update('watchers', (watchers) => assocProp(watcher.id, watcher, watchers), query)
  yield put(setQueryAction({ query, queryKey }))
  return watcher
}

export default addQueryWatcher
