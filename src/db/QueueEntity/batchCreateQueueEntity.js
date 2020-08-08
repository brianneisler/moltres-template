import { batchCreateEntity } from '../Entity'

import { QueueEntity } from './schemas'

const batchCreateQueueEntity = batchCreateEntity(QueueEntity)

export default batchCreateQueueEntity
