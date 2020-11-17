import { batchDeleteEntity } from 'moltres/core'
import { NotificationSend } from '../schemas'

const batchDeleteNotificationSend = batchDeleteEntity(NotificationSend)

export default batchDeleteNotificationSend
