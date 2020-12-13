import { findDocumentById } from 'moltres/db'

import { NotificationSend } from '../schemas'

const findNotificationSendByIds = findDocumentById(NotificationSend)

export default findNotificationSendByIds
