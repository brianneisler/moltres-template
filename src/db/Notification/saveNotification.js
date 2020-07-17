import { saveEntity } from '../Entity'

import { Notification } from './schemas'

const saveNotification = saveEntity(Notification)

export default saveNotification
