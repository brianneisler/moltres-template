import { batchCreateEntity } from '../Entity'

import { Notification } from './schemas'

const batchCreateNotification = batchCreateEntity(Notification)

export default batchCreateNotification
