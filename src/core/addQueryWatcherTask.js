import { append, update } from '../utils/lang'
import { put, select } from '../utils/redux'
import { selectQuery } from './selectors'
import { setQueryAction } from './actions'

const addQueryWatcherTask = function* (queryKey, watcherId, task) {
  let query = yield select(selectQuery(queryKey))
  query = update(
    ['watchers', watcherId, 'queryTasks'],
    (queryTasks) => append(task, queryTasks),
    query
  )
  yield put(setQueryAction({ query, queryKey }))
  return task
}

export default addQueryWatcherTask
