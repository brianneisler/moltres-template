import { batchDeleteEntity } from '../Entity'

import { Notification } from './schemas'

const batchDeleteNotification = batchDeleteEntity(Notification)

export default batchDeleteNotification
