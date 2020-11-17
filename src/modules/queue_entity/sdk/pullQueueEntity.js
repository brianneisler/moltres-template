import { buildTransaction, formatDocument } from 'moltres/db'
import { curry } from 'moltres/lang'
import { batchUpdateQueue, getQueueById } from '../../queue/sdk'

import batchRemoveQueueEntity from './batchRemoveQueueEntity'
import getQueueEntityById from './getQueueEntityById'

const pullQueueEntity = curry(async (context, queueId, options = {}) => {
  return await buildTransaction(context, async (transactionContext) => {
    const queue = await getQueueById(transactionContext, queueId, options)
    if (queue.length === 0) {
      return null
    }
    const queueEntityDocument = await getQueueEntityById(
      transactionContext,
      [queueId, queue.headIndex],
      { ...options, format: 'document' }
    )

    const headIndex = queue.headIndex + 1
    await batchUpdateQueue(
      transactionContext,
      transactionContext.transaction,
      queueId,
      {
        headIndex,
        length: queue.length - 1
      },
      options
    )

    await batchRemoveQueueEntity(
      {
        ...transactionContext,
        document: queueEntityDocument
      },
      transactionContext.transaction,
      [queueId, queue.headIndex],
      {},
      options
    )
    return formatDocument(queueEntityDocument, options)
  })
})

export default pullQueueEntity
