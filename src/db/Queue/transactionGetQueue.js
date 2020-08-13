import { transactionGetEntity } from '../Entity'

import { Queue } from './schemas'

const transactionGetQueue = transactionGetEntity(Queue)

export default transactionGetQueue
