import { batchCreateEntity } from '../Entity'

import { NotificationSend } from './schemas'

const batchCreateNotificationSend = batchCreateEntity(NotificationSend)

export default batchCreateNotificationSend
