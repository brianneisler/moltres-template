import { NotificationSend } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateNotificationSend = batchCreateEntity(NotificationSend)

export default batchCreateNotificationSend
