import { saveEntity } from '../../../core/sdk'
import { NotificationSend } from '../schemas'

const saveNotificationSend = saveEntity(NotificationSend)

export default saveNotificationSend
