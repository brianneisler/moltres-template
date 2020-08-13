import { queryEntities } from '../Entity'

import { Queue } from './schemas'

const queryQueues = queryEntities(Queue)

export default queryQueues
