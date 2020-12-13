import { curry } from 'moltres/lang'

import queryNotifications from './queryNotifications'

const queryNotificationsByUserId = curry((context, userId, queryOptions) =>
  queryNotifications(context, { userId }, queryOptions)
)

export default queryNotificationsByUserId
