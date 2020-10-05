import { refDocumentById } from '../../../utils/db'
import { Queue } from '../schemas'

const refQueueById = refDocumentById(Queue)

export default refQueueById
