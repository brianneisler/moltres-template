import { refDocumentById } from '../../utils/db'
import { NotificationSend } from '../Notification/schemas'

const refNotificationSendById = refDocumentById(NotificationSend)

export default refNotificationSendById
