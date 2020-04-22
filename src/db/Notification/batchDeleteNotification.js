import { Notification } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeleteNotification = batchDeleteEntity(Notification)

export default batchDeleteNotification
