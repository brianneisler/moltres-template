import { batchDeleteEntity } from '../../../core/sdk'
import { Queue } from '../schemas'

const batchDeleteQueue = batchDeleteEntity(Queue)

export default batchDeleteQueue
