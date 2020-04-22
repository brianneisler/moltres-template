import { commitBatch, getFromRef } from '../../utils/db'
import { curry } from '../../utils/data'
import batchCreateEntityStats from './batchCreateEntityStats'

const createEntityStats = curry(async (context, value) => {
  const { database } = context
  const batch = database.batch()
  const ref = batchCreateEntityStats(context, batch, value)
  await commitBatch(batch)
  return getFromRef(context, ref)
})

export default createEntityStats
