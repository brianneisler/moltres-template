import { cancel, put, select } from '../utils/lang'
import { filter, update } from '../utils/data'
import { selectQuery } from './selectors'
import { setQueryAction } from './actions'

const removeQueryWatcherTask = function* (queryKey, watcherId, task) {
  let query = yield select(selectQuery(queryKey))
  yield cancel(task)
  query = update(
    ['watchers', watcherId, 'queryTasks'],
    (queryTasks) => filter((queryTask) => queryTask !== task, queryTasks),
    query
  )
  yield put(setQueryAction({ query, queryKey }))
  return query
}

export default removeQueryWatcherTask
