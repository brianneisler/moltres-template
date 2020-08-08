import { batchRemoveEntity } from '../Entity'

import { Queue } from './schemas'

const batchRemoveQueue = batchRemoveEntity(Queue)

export default batchRemoveQueue
