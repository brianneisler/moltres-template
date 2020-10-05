import { queryEntities } from '../../../core/sdk'
import { QueueEntity } from '../schemas'

const queryQueueEntities = queryEntities(QueueEntity)

export default queryQueueEntities
