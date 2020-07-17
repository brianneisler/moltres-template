import { getDocumentById } from '../../utils/db'

import { Notification } from './schemas'

const getNotificationById = getDocumentById(Notification)

export default getNotificationById
