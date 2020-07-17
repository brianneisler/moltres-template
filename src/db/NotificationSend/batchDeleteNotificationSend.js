import { NotificationSend } from '../Notification/schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeleteNotificationSend = batchDeleteEntity(NotificationSend)

export default batchDeleteNotificationSend
