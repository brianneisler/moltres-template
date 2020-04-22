import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchUpdateEntityStats from './batchUpdateEntityStats'

const updateEntityStats = curry(async (context, id, updates) => {
  const { database } = context
  const batch = database.batch()
  const ref = await batchUpdateEntityStats(context, batch, id, updates)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default updateEntityStats
