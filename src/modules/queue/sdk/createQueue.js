import { buildBatch, commitBatch, getFromRef } from '../../../utils/db'
import { curry } from '../../../utils/lang'

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
