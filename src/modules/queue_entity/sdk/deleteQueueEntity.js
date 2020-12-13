import { deleteEntity } from 'moltres/core'
import { QueueEntity } from '../schemas'

const deleteQueueEntity = deleteEntity(QueueEntity)

export default deleteQueueEntity
