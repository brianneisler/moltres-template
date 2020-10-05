import { batchUpdateEntity } from '../../../core/sdk'
import { QueueEntity } from '../schemas'

const batchUpdateQueueEntity = batchUpdateEntity(QueueEntity)

export default batchUpdateQueueEntity
