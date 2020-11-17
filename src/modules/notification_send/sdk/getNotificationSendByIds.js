import { getDocumentById } from 'moltres/db'

import { NotificationSend } from '../schemas'

const getNotificationSendByIds = getDocumentById(NotificationSend)

export default getNotificationSendByIds
