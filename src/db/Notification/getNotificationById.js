import { Notification } from './schemas'
import { getDocumentById } from '../../utils/db'

const getNotificationById = getDocumentById(Notification)

export default getNotificationById
