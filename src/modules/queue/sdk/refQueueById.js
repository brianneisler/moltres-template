import { refDocumentById } from 'moltres/db'

import { Queue } from '../schemas'

const refQueueById = refDocumentById(Queue)

export default refQueueById
