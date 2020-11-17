import { batchRemoveEntity } from 'moltres/core'
import { QueueEntity } from '../schemas'

const batchRemoveQueueEntity = batchRemoveEntity(QueueEntity)

export default batchRemoveQueueEntity
