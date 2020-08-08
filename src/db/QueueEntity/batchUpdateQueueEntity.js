import { batchUpdateEntity } from '../Entity'

import { QueueEntity } from './schemas'

const batchUpdateQueueEntity = batchUpdateEntity(QueueEntity)

export default batchUpdateQueueEntity
