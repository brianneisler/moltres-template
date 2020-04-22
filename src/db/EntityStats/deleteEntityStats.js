import { commitBatch } from '../../utils/db'
import { curry } from '../../utils/data'
import batchDeleteEntityStats from './batchDeleteEntityStats'

const deleteEntityStats = curry(async (context, value) => {
  const { database } = context
  const batch = database.batch()
  await batchDeleteEntityStats(context, batch, value)
  return commitBatch(batch)
})

export default deleteEntityStats
