import { NotificationSend } from '../Notification/schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateNotificationSend = batchCreateEntity(NotificationSend)

export default batchCreateNotificationSend
