import { batchRemoveEntity } from '../../../core/sdk'
import { Queue } from '../schemas'

const batchRemoveQueue = batchRemoveEntity(Queue)

export default batchRemoveQueue
