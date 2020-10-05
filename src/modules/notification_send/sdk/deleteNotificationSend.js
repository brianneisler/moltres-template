import { deleteEntity } from '../../../core/sdk'
import { NotificationSend } from '../schemas'

const deleteNotificationSend = deleteEntity(NotificationSend)

export default deleteNotificationSend
