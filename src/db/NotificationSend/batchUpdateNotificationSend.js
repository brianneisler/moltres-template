import { batchUpdateEntity } from '../Entity'

import { NotificationSend } from './schemas'

const batchUpdateNotificationSend = batchUpdateEntity(NotificationSend)

export default batchUpdateNotificationSend
