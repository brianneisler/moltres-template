import { call, invariant, select } from '../../utils/redux'
import { isString } from '../../utils/lang'
import { removeQueryWatcher, selectQueryResults } from '../../core'
import queryAndWatchNotification from './queryAndWatchNotification'

const findEnhancedNotificationById = function* (context, id) {
  invariant(isString(id), 'id must be a String')

  const queryKey = `Notification.${id}`
  const watcher = yield call(queryAndWatchNotification, context, id)
  const result = yield select(selectQueryResults(queryKey))
  yield call(removeQueryWatcher, queryKey, watcher)
  return result
}

export default findEnhancedNotificationById
