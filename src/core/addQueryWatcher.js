import { assoc, update } from '../utils/lang'
import { put, select } from '../utils/redux'

import { setQueryAction } from './actions'
import { selectQuery } from './selectors'

const addQueryWatcher = function* (context, queryKey, watcher) {
  let query = yield select(selectQuery(queryKey))
  query = update(
    'watchers',
    (watchers) => assoc(watcher.id, watcher, watchers),
    query
  )
  yield put(setQueryAction(context, { query, queryKey }))
  return watcher
}

export default addQueryWatcher
