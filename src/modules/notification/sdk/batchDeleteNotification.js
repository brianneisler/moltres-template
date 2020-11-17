import { batchDeleteEntity } from 'moltres/core'
import { Notification } from '../schemas'

const batchDeleteNotification = batchDeleteEntity(Notification)

export default batchDeleteNotification
