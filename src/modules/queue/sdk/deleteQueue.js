import { deleteEntity } from '../../../core/sdk'
import { Queue } from '../schemas'

const deleteQueue = deleteEntity(Queue)

export default deleteQueue
