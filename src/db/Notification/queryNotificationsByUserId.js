import { curry } from '../../utils/data'
import queryNotifications from './queryNotifications'

const queryNotificationsByUserId = curry((context, userId, queryOptions) =>
  queryNotifications(context, { userId }, queryOptions)
)

export default queryNotificationsByUserId
