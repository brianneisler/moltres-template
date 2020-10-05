import { deleteEntity } from '../../../core/sdk'
import { Notification } from '../schemas'

const deleteNotification = deleteEntity(Notification)

export default deleteNotification
