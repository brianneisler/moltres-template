import { batchUpdateEntity } from '../Entity'

import { Notification } from './schemas'

const batchUpdateNotification = batchUpdateEntity(Notification)

export default batchUpdateNotification
