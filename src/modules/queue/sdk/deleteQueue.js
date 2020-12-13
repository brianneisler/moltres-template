import { deleteEntity } from 'moltres/core'
import { Queue } from '../schemas'

const deleteQueue = deleteEntity(Queue)

export default deleteQueue
