import { batchRemoveEntity } from '../Entity'

import { QueueEntity } from './schemas'

const batchRemoveQueueEntity = batchRemoveEntity(QueueEntity)

export default batchRemoveQueueEntity
