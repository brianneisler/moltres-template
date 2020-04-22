import { Notification } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdateNotification = batchUpdateEntity(Notification)

export default batchUpdateNotification
