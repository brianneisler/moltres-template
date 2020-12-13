import { batchDeleteEntity } from 'moltres/core'
import { Queue } from '../schemas'

const batchDeleteQueue = batchDeleteEntity(Queue)

export default batchDeleteQueue
