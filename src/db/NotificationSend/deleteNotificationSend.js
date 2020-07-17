import { deleteEntity } from '../Entity'
import { NotificationSend } from '../Notification/schemas'

const deleteNotificationSend = deleteEntity(NotificationSend)

export default deleteNotificationSend
