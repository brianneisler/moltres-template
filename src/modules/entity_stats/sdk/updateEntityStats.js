import { buildBatch, commitBatch, getFromRef } from 'moltres/db'
import { curry } from 'moltres/lang'

import batchUpdateEntityStats from './batchUpdateEntityStats'

const updateEntityStats = curry(async (context, id, updates) => {
  let ref
  await commitBatch(
    buildBatch(context, async (batch) => {
      ref = await batchUpdateEntityStats(context, batch, id, updates)
    })
  )
  return getFromRef(context, ref)
})

export default updateEntityStats
