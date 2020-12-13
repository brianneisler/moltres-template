import { getDocumentById } from 'moltres/db'
import { Notification } from '../schemas'

const getNotificationById = getDocumentById(Notification)

export default getNotificationById
