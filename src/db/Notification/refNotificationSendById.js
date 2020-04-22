import { NotificationSend } from './schemas'
import { refDocumentById } from '../../utils/db'

const refNotificationSendById = refDocumentById(NotificationSend)

export default refNotificationSendById
