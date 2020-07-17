import { findDocumentById } from '../../utils/db'
import { NotificationSend } from '../Notification/schemas'

const findNotificationSendByIds = findDocumentById(NotificationSend)

export default findNotificationSendByIds
