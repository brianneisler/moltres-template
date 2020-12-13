import { batchRemoveEntity } from 'moltres/core'
import { Notification } from '../schemas'

const batchRemoveNotification = batchRemoveEntity(Notification)

export default batchRemoveNotification
