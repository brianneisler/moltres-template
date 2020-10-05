import { batchRemoveEntity } from '../../../core/sdk'
import { NotificationSend } from '../schemas'

const batchRemoveNotificationSend = batchRemoveEntity(NotificationSend)

export default batchRemoveNotificationSend
