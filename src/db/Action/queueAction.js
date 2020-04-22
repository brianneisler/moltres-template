import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchQueueAction from './batchQueueAction'

const queueAction = curry(async (ActionSchema, context, value) => {
  const { database } = context
  const batch = database.batch()
  const ref = batchQueueAction(ActionSchema, context, batch, value)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default queueAction
