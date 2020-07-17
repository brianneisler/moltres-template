import { saveEntity } from '../Entity'
import { NotificationSend } from '../Notification/schemas'

const saveNotificationSend = saveEntity(NotificationSend)

export default saveNotificationSend
