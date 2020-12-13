import { refDocumentById } from 'moltres/db'

import { NotificationSend } from '../schemas'

const refNotificationSendById = refDocumentById(NotificationSend)

export default refNotificationSendById
