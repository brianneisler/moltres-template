import { buildTransaction, getFromRef } from '../../utils/db'
import { assoc, curry } from '../../utils/lang'
import { batchUpdateQueue, getQueueById } from '../Queue'

import batchCreateQueueEntity from './batchCreateQueueEntity'

const pushQueueEntity = curry(async (context, data, options = {}) => {
  const { queueId } = data
  const ref = await buildTransaction(context, async (transactionContext) => {
    const queue = await getQueueById(transactionContext, queueId, options)

    const tailIndex = queue.tailIndex + 1
    await batchUpdateQueue(
      transactionContext,
      transactionContext.transaction,
      queueId,
      {
        length: queue.length + 1,
        tailIndex
      }
    )

    return batchCreateQueueEntity(
      transactionContext,
      transactionContext.transaction,
      assoc('index', tailIndex, data)
    )
  })
  return await getFromRef(context, ref)
})

export default pushQueueEntity
