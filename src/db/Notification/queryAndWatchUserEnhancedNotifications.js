import { call } from '../../utils/redux'
import { factoryAndWatchQuery } from '../../core'
import { invariant, isObject } from '../../utils/lang'
import enhanceNotification from './enhanceNotification'
import queryNotifications from './queryNotifications'

const queryAndWatchUserEnhancedNotifications = function* (
  context,
  currentUser
) {
  invariant(isObject(currentUser), 'currentUser must be a Object')

  return yield call(factoryAndWatchQuery, {
    context,
    createQuery: queryNotifications,
    enhancer: enhanceNotification,
    initialState: { userId: currentUser.id },
    queryKey: `Notifications.${currentUser.id}`
  })
}

export default queryAndWatchUserEnhancedNotifications
