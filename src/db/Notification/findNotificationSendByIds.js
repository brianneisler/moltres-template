import { NotificationSend } from './schemas'
import { findDocumentById } from '../../utils/db'

const findNotificationSendByIds = findDocumentById(NotificationSend)

export default findNotificationSendByIds