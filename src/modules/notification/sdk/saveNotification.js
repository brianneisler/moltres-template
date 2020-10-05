import { saveEntity } from '../../../core/sdk'
import { Notification } from '../schemas'

const saveNotification = saveEntity(Notification)

export default saveNotification
