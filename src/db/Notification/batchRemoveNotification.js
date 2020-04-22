import { Notification } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemoveNotification = batchRemoveEntity(Notification)

export default batchRemoveNotification
