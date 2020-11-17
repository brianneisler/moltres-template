import { batchUpdateEntity } from 'moltres/core'
import { QueueEntity } from '../schemas'

const batchUpdateQueueEntity = batchUpdateEntity(QueueEntity)

export default batchUpdateQueueEntity
