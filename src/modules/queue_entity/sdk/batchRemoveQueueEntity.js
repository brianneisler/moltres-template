import { batchRemoveEntity } from '../../../core/sdk'
import { QueueEntity } from '../schemas'

const batchRemoveQueueEntity = batchRemoveEntity(QueueEntity)

export default batchRemoveQueueEntity
