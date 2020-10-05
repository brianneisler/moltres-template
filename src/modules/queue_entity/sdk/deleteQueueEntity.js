import { deleteEntity } from '../../../core/sdk'
import { QueueEntity } from '../schemas'

const deleteQueueEntity = deleteEntity(QueueEntity)

export default deleteQueueEntity
