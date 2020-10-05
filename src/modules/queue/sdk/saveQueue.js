import { saveEntity } from '../../../core/sdk'
import { Queue } from '../schemas'

const saveQueue = saveEntity(Queue)

export default saveQueue
