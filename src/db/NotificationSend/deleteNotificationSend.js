import { NotificationSend } from '../Notification/schemas'
import { deleteEntity } from '../Entity'

const deleteNotificationSend = deleteEntity(NotificationSend)

export default deleteNotificationSend
