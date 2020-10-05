import { queryEntities } from '../../../core/sdk'
import { Queue } from '../schemas'

const queryQueues = queryEntities(Queue)

export default queryQueues
