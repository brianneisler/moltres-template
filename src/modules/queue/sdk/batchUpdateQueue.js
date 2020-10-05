import { batchUpdateEntity } from '../../../core/sdk'
import { Queue } from '../schemas'

const batchUpdateQueue = batchUpdateEntity(Queue)

export default batchUpdateQueue
