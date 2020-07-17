import { NotificationSend } from '../Notification/schemas'
import { findDocumentById } from '../../utils/db'

const findNotificationSendByIds = findDocumentById(NotificationSend)

export default findNotificationSendByIds
