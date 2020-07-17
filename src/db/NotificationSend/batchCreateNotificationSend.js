import { batchCreateEntity } from '../Entity'
import { NotificationSend } from '../Notification/schemas'

const batchCreateNotificationSend = batchCreateEntity(NotificationSend)

export default batchCreateNotificationSend
