import { batchDeleteEntity } from 'moltres/core'
import { QueueEntity } from '../schemas'

const batchDeleteQueueEntity = batchDeleteEntity(QueueEntity)

export default batchDeleteQueueEntity
