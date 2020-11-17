import { batchUpdateEntity } from 'moltres/core'
import { NotificationSend } from '../schemas'

const batchUpdateNotificationSend = batchUpdateEntity(NotificationSend)

export default batchUpdateNotificationSend
