import { getDocumentById } from '../../utils/db'
import { NotificationSend } from '../Notification/schemas'

const getNotificationSendByIds = getDocumentById(NotificationSend)

export default getNotificationSendByIds
