import { buildQuery } from '../../../utils/db'
import { curry, isUndefined } from '../../../utils/lang'
import { Notification } from '../schemas'

const queryNotifications = curry((context, { userId }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(userId)) {
        query = query.where('userId', '==', userId)
      }
      return query
    },
    Notification,
    context,
    queryOptions
  )
)

export default queryNotifications
