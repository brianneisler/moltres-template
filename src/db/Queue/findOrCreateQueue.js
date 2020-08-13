import { findOrCreateEntity } from '../Entity'

import { Queue } from './schemas'

const findOrCreateQueue = findOrCreateEntity(Queue)

export default findOrCreateQueue
