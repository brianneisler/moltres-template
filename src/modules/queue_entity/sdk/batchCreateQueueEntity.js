import { batchCreateEntity } from 'moltres/core'
import { QueueEntity } from '../schemas'

const batchCreateQueueEntity = batchCreateEntity(QueueEntity)

export default batchCreateQueueEntity
