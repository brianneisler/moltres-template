import { getDocumentById } from '../../../utils/db'
import { Queue } from '../schemas'

const getQueueById = getDocumentById(Queue)

export default getQueueById
