import { refDocumentById } from '../../utils/db'

import { NotificationSend } from './schemas'

const refNotificationSendById = refDocumentById(NotificationSend)

export default refNotificationSendById
