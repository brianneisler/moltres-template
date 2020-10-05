import { transactionGetEntity } from '../../../core/sdk'
import { Queue } from '../schemas'

const transactionGetQueue = transactionGetEntity(Queue)

export default transactionGetQueue
