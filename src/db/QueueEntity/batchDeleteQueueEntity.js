import { batchDeleteEntity } from '../Entity'

import { QueueEntity } from './schemas'

const batchDeleteQueueEntity = batchDeleteEntity(QueueEntity)

export default batchDeleteQueueEntity
