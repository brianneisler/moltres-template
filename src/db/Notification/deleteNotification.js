import { Notification } from './schemas'
import { deleteEntity } from '../Entity'

const deleteNotification = deleteEntity(Notification)

export default deleteNotification
