import { batchDeleteEntity } from '../../../core/sdk'
import { QueueEntity } from '../schemas'

const batchDeleteQueueEntity = batchDeleteEntity(QueueEntity)

export default batchDeleteQueueEntity
