import { batchUpdateEntity } from 'moltres/core'
import { Queue } from '../schemas'

const batchUpdateQueue = batchUpdateEntity(Queue)

export default batchUpdateQueue
