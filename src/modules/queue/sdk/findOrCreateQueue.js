import { findOrCreateEntity } from 'moltres/core'
import { Queue } from '../schemas'

const findOrCreateQueue = findOrCreateEntity(Queue)

export default findOrCreateQueue
