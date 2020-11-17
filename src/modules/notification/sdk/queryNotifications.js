import { curry, isUndefined } from 'moltres/lang'

import { buildQuery } from 'moltres/db'
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
