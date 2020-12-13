import { batchCreateEntity } from 'moltres/core'
import { NotificationSend } from '../schemas'

const batchCreateNotificationSend = batchCreateEntity(NotificationSend)

export default batchCreateNotificationSend
