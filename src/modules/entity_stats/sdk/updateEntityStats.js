import { buildBatch, commitBatch, getFromRef } from '../../../utils/db'
import { curry } from '../../../utils/lang'

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
