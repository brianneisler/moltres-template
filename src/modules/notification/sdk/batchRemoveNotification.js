import { batchRemoveEntity } from '../../../core/sdk'
import { Notification } from '../schemas'

const batchRemoveNotification = batchRemoveEntity(Notification)

export default batchRemoveNotification
