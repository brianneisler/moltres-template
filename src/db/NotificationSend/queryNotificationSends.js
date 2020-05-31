import { NotificationSend } from '../Notification/schemas'
import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/data'

const queryNotificationSends = curry((context, { notificationId, userId }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(notificationId)) {
        query = query.where('notificationId', '==', notificationId)
      }
      if (!isUndefined(userId)) {
        query = query.where('userId', '==', userId)
      }
      return query
    },
    NotificationSend,
    context,
    queryOptions
  )
)

export default queryNotificationSends
