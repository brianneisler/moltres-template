import { getDocumentById } from 'moltres/db'
import { Queue } from '../schemas'

const getQueueById = getDocumentById(Queue)

export default getQueueById
