import { batchCreateEntity } from '../../../core/sdk'
import { NotificationSend } from '../schemas'

const batchCreateNotificationSend = batchCreateEntity(NotificationSend)

export default batchCreateNotificationSend
