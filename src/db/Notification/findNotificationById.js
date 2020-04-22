import { Notification } from './schemas'
import { findDocumentById } from '../../utils/db'

const findNotificationById = findDocumentById(Notification)

export default findNotificationById
