import { batchDeleteEntity } from '../../../core/sdk'
import { NotificationSend } from '../schemas'

const batchDeleteNotificationSend = batchDeleteEntity(NotificationSend)

export default batchDeleteNotificationSend
