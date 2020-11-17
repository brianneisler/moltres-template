import { saveEntity } from 'moltres/core'
import { NotificationSend } from '../schemas'

const saveNotificationSend = saveEntity(NotificationSend)

export default saveNotificationSend
