import { batchRemoveEntity } from 'moltres/core'
import { Queue } from '../schemas'

const batchRemoveQueue = batchRemoveEntity(Queue)

export default batchRemoveQueue
