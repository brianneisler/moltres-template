import { NotificationSend } from './schemas'
import { deleteEntity } from '../Entity'

const deleteNotificationSend = deleteEntity(NotificationSend)

export default deleteNotificationSend
