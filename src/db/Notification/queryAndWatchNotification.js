import { call } from '../../utils/redux'
import { factoryAndWatchQuery } from '../../core'
import { invariant, isString } from '../../utils/lang'
import enhanceNotification from './enhanceNotification'
import refNotificationById from './refNotificationById'

const queryAndWatchNotification = function* (context, notificationId) {
  invariant(isString(notificationId), 'notificationId must be a String')

  return yield call(factoryAndWatchQuery, {
    context,
    createQuery: refNotificationById,
    enhancer: enhanceNotification,
    initialState: { ids: notificationId },
    queryKey: `Notification.${notificationId}`
  })
}

export default queryAndWatchNotification
