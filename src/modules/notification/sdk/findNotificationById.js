import { findDocumentById } from '../../../utils/db'
import { Notification } from '../schemas'

const findNotificationById = findDocumentById(Notification)

export default findNotificationById
