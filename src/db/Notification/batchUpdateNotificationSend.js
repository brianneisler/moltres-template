import { NotificationSend } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdateNotificationSend = batchUpdateEntity(NotificationSend)

export default batchUpdateNotificationSend
