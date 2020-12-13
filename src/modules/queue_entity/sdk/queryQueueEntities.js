import { queryEntities } from 'moltres/core'
import { QueueEntity } from '../schemas'

const queryQueueEntities = queryEntities(QueueEntity)

export default queryQueueEntities
