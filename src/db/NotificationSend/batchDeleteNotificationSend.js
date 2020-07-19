import { batchDeleteEntity } from '../Entity'

import { NotificationSend } from './schemas'

const batchDeleteNotificationSend = batchDeleteEntity(NotificationSend)

export default batchDeleteNotificationSend
