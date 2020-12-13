import { batchCreateEntity } from 'moltres/core'
import { Notification } from '../schemas'

const batchCreateNotification = batchCreateEntity(Notification)

export default batchCreateNotification
