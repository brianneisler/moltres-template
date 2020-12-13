import { findDocumentById } from 'moltres/db'
import { Notification } from '../schemas'

const findNotificationById = findDocumentById(Notification)

export default findNotificationById
