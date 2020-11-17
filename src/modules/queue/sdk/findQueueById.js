import { findDocumentById } from 'moltres/db'

import { Queue } from '../schemas'

const findQueueById = findDocumentById(Queue)

export default findQueueById
