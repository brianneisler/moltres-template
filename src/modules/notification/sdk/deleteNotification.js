import { deleteEntity } from 'moltres/core'
import { Notification } from '../schemas'

const deleteNotification = deleteEntity(Notification)

export default deleteNotification
