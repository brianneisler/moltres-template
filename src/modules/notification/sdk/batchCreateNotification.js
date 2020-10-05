import { batchCreateEntity } from '../../../core/sdk'
import { Notification } from '../schemas'

const batchCreateNotification = batchCreateEntity(Notification)

export default batchCreateNotification
