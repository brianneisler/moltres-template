import { Notification } from './schemas'
import { saveEntity } from '../Entity'

const saveNotification = saveEntity(Notification)

export default saveNotification
