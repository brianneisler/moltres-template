import { removeQueryWatcher, selectQueryResults } from 'moltres/core'
import { invariant, isString } from 'moltres/lang'
import { call, select } from 'moltres/redux'

import queryAndWatchNotification from './queryAndWatchNotification'

const findEnhancedNotificationById = function* (context, id) {
  invariant(isString(id), 'id must be a String')

  const queryKey = `Notification.${id}`
  const watcher = yield call(queryAndWatchNotification, context, id)
  const result = yield select(selectQueryResults(queryKey))
  yield call(removeQueryWatcher, context, queryKey, watcher)
  return result
}

export default findEnhancedNotificationById
