import { Notification } from './schemas'
import { refDocumentById } from '../../utils/db'

const refNotificationById = refDocumentById(Notification)

export default refNotificationById
