import { queryEntities } from 'moltres/core'
import { Queue } from '../schemas'

const queryQueues = queryEntities(Queue)

export default queryQueues
