import { batchUpdateEntity } from '../../../core/sdk'
import { NotificationSend } from '../schemas'

const batchUpdateNotificationSend = batchUpdateEntity(NotificationSend)

export default batchUpdateNotificationSend
