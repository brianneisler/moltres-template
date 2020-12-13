import { buildBatch, commitBatch, getFromRef } from 'moltres/db'
import { curry } from 'moltres/lang'

import batchCreateQueue from './batchCreateQueue'

const createQueue = curry(async (context, value, options = {}) => {
  let ref
  await commitBatch(
    buildBatch(context, (batch) => {
      ref = batchCreateQueue(context, batch, value, options)
    })
  )
  return await getFromRef(context, ref)
})

export default createQueue
