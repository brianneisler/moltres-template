import { append, update } from '../utils/lang'
import { put, select } from '../utils/redux'

import { setQueryAction } from './actions'
import { selectQuery } from './selectors'

const addQueryWatcherTask = function* (context, queryKey, watcherId, task) {
  let query = yield select(selectQuery(queryKey))
  query = update(
    ['watchers', watcherId, 'queryTasks'],
    (queryTasks) => append(task, queryTasks),
    query
  )
  yield put(setQueryAction(context, { query, queryKey }))
  return task
}

export default addQueryWatcherTask
