import { getDocumentById } from '../../../utils/db'
import { NotificationSend } from '../schemas'

const getNotificationSendByIds = getDocumentById(NotificationSend)

export default getNotificationSendByIds
