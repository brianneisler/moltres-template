import { batchRemoveEntity } from '../Entity'

import { NotificationSend } from './schemas'

const batchRemoveNotificationSend = batchRemoveEntity(NotificationSend)

export default batchRemoveNotificationSend
