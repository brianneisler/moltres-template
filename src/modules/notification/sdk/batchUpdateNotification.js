import { batchUpdateEntity } from '../../../core/sdk'
import { Notification } from '../schemas'

const batchUpdateNotification = batchUpdateEntity(Notification)

export default batchUpdateNotification
