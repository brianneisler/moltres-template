import { refDocumentById } from '../../../utils/db'
import { Notification } from '../schemas'

const refNotificationById = refDocumentById(Notification)

export default refNotificationById
