import { batchRemoveEntity } from 'moltres/core'
import { NotificationSend } from '../schemas'

const batchRemoveNotificationSend = batchRemoveEntity(NotificationSend)

export default batchRemoveNotificationSend
