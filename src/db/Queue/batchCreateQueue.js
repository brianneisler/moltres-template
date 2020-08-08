import { batchCreateEntity } from '../Entity'

import { Queue } from './schemas'

const batchCreateQueue = batchCreateEntity(Queue)

export default batchCreateQueue
