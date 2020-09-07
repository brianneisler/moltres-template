import { filter, update } from '../utils/lang'
import { cancel, put, select } from '../utils/redux'

import { setQueryAction } from './actions'
import { selectQuery } from './selectors'

const removeQueryWatcherTask = function* (context, queryKey, watcherId, task) {
  let query = yield select(selectQuery(queryKey))
  yield cancel(task)
  query = update(
    ['watchers', watcherId, 'queryTasks'],
    (queryTasks) => filter((queryTask) => queryTask !== task, queryTasks),
    query
  )
  yield put(setQueryAction(context, { query, queryKey }))
  return query
}

export default removeQueryWatcherTask
