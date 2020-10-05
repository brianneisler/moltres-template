import { findOrCreateEntity } from '../../../core/sdk'
import { Queue } from '../schemas'

const findOrCreateQueue = findOrCreateEntity(Queue)

export default findOrCreateQueue
