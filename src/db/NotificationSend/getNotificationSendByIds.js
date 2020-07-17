import { NotificationSend } from '../Notification/schemas'
import { getDocumentById } from '../../utils/db'

const getNotificationSendByIds = getDocumentById(NotificationSend)

export default getNotificationSendByIds
