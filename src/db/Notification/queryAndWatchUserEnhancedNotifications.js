import { call, invariant } from '../../utils/lang'
import { factoryAndWatchQuery } from '../../core'
import { isObject } from '../../utils/data'
import enhanceNotification from './enhanceNotification'
import queryNotifications from './queryNotifications'

const queryAndWatchUserEnhancedNotifications = function* (context, currentUser) {
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
