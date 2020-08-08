import { batchUpdateEntity } from '../Entity'

import { Queue } from './schemas'

const batchUpdateQueue = batchUpdateEntity(Queue)

export default batchUpdateQueue
