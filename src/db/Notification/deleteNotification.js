import { deleteEntity } from '../Entity'

import { Notification } from './schemas'

const deleteNotification = deleteEntity(Notification)

export default deleteNotification
