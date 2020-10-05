import { getDocumentById } from '../../../utils/db'
import { QueueEntity } from '../schemas'

const getQueueEntityById = getDocumentById(QueueEntity)

export default getQueueEntityById
