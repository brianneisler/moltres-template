import { transactionGetEntity } from 'moltres/core'
import { Queue } from '../schemas'

const transactionGetQueue = transactionGetEntity(Queue)

export default transactionGetQueue
