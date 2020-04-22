import { NotificationSend } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemoveNotificationSend = batchRemoveEntity(NotificationSend)

export default batchRemoveNotificationSend
