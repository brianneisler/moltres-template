import { saveEntity } from 'moltres/core'
import { Notification } from '../schemas'

const saveNotification = saveEntity(Notification)

export default saveNotification
