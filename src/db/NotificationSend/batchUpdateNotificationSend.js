import { batchUpdateEntity } from '../Entity'
import { NotificationSend } from '../Notification/schemas'

const batchUpdateNotificationSend = batchUpdateEntity(NotificationSend)

export default batchUpdateNotificationSend
