import { findDocumentById } from '../../utils/db'

import { Queue } from './schemas'

const findQueueById = findDocumentById(Queue)

export default findQueueById
