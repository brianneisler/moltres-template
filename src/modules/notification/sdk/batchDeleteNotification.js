import { batchDeleteEntity } from '../../../core/sdk'
import { Notification } from '../schemas'

const batchDeleteNotification = batchDeleteEntity(Notification)

export default batchDeleteNotification
