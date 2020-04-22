import { NotificationSend } from './schemas'
import { getDocumentById } from '../../utils/db'

const getNotificationSendByIds = getDocumentById(NotificationSend)

export default getNotificationSendByIds
