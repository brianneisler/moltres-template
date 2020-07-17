import { batchRemoveEntity } from '../Entity'
import { NotificationSend } from '../Notification/schemas'

const batchRemoveNotificationSend = batchRemoveEntity(NotificationSend)

export default batchRemoveNotificationSend
