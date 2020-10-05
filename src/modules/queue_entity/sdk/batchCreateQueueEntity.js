import { batchCreateEntity } from '../../../core/sdk'
import { QueueEntity } from '../schemas'

const batchCreateQueueEntity = batchCreateEntity(QueueEntity)

export default batchCreateQueueEntity
