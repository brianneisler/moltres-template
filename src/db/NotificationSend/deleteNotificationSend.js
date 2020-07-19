import { deleteEntity } from '../Entity'

import { NotificationSend } from './schemas'

const deleteNotificationSend = deleteEntity(NotificationSend)

export default deleteNotificationSend
