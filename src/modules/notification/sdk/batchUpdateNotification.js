import { batchUpdateEntity } from 'moltres/core'
import { Notification } from '../schemas'

const batchUpdateNotification = batchUpdateEntity(Notification)

export default batchUpdateNotification
