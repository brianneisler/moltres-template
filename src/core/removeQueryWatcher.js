import { dissocProperty, map, update } from '../utils/lang'
import { all, cancel, put, select } from '../utils/redux'

import { setQueryAction } from './actions'
import { selectQuery } from './selectors'

const removeQueryWatcher = function* (context, queryKey, watcher) {
  let query = yield select(selectQuery(queryKey))
  yield all(map((queryTask) => cancel(queryTask), watcher.queryTasks))
  yield cancel(watcher.task)
  query = update(
    'watchers',
    (watchers) => dissocProperty(watcher.id, watcher, watchers),
    query
  )
  yield put(setQueryAction(context, { query, queryKey }))
  return query
}

export default removeQueryWatcher
