import { findDocumentById } from '../../utils/db'

import { NotificationSend } from './schemas'

const findNotificationSendByIds = findDocumentById(NotificationSend)

export default findNotificationSendByIds
