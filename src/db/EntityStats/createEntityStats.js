import { buildBatch, commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/lang'

import batchCreateEntityStats from './batchCreateEntityStats'

const createEntityStats = curry(async (context, value) => {
  let ref
  await commitBatch(
    buildBatch(context, (batch) => {
      ref = batchCreateEntityStats(context, batch, value)
    })
  )
  return getFromRef(context, ref)
})

export default createEntityStats
