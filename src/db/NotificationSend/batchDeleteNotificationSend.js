import { batchDeleteEntity } from '../Entity'
import { NotificationSend } from '../Notification/schemas'

const batchDeleteNotificationSend = batchDeleteEntity(NotificationSend)

export default batchDeleteNotificationSend
