import { batchRemoveEntity } from '../Entity'

import { Notification } from './schemas'

const batchRemoveNotification = batchRemoveEntity(Notification)

export default batchRemoveNotification
