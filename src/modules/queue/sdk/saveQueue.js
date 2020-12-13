import { saveEntity } from 'moltres/core'
import { Queue } from '../schemas'

const saveQueue = saveEntity(Queue)

export default saveQueue
