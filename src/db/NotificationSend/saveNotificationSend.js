import { NotificationSend } from '../Notification/schemas'
import { saveEntity } from '../Entity'

const saveNotificationSend = saveEntity(NotificationSend)

export default saveNotificationSend
