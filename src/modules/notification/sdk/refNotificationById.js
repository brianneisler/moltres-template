import { refDocumentById } from 'moltres/db'
import { Notification } from '../schemas'

const refNotificationById = refDocumentById(Notification)

export default refNotificationById
