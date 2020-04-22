import { Notification } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateNotification = batchCreateEntity(Notification)

export default batchCreateNotification
