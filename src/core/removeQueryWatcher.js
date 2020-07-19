import { dissocProp, map, update } from '../utils/lang'
import { all, cancel, put, select } from '../utils/redux'

import { setQueryAction } from './actions'
import { selectQuery } from './selectors'

const removeQueryWatcher = function* (queryKey, watcher) {
  let query = yield select(selectQuery(queryKey))
  yield all(map((queryTask) => cancel(queryTask), watcher.queryTasks))
  yield cancel(watcher.task)
  query = update(
    'watchers',
    (watchers) => dissocProp(watcher.id, watcher, watchers),
    query
  )
  yield put(setQueryAction({ query, queryKey }))
  return query
}

export default removeQueryWatcher
