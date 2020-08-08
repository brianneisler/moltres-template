import { batchDeleteEntity } from '../Entity'

import { Queue } from './schemas'

const batchDeleteQueue = batchDeleteEntity(Queue)

export default batchDeleteQueue
