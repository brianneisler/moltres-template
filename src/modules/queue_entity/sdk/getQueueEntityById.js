import { getDocumentById } from 'moltres/db'

import { QueueEntity } from '../schemas'

const getQueueEntityById = getDocumentById(QueueEntity)

export default getQueueEntityById
