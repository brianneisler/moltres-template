import { buildBatch, commitBatch, getFromRef } from '../../../../utils/db'
import { curry } from '../../../../utils/lang'

import batchQueueAction from './batchQueueAction'

const queueAction = curry(async (ActionSchema, context, value) => {
  let ref
  await commitBatch(
    buildBatch(context, (batch) => {
      ref = batchQueueAction(ActionSchema, context, batch, value)
    })
  )
  return await getFromRef(context, ref)
})

export default queueAction
