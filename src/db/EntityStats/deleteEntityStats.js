import { buildBatch, commitBatch } from '../../utils/db'
import { curry } from '../../utils/lang'
import batchDeleteEntityStats from './batchDeleteEntityStats'

const deleteEntityStats = curry(
  async (context, value) =>
    await commitBatch(
      buildBatch(context, (batch) =>
        batchDeleteEntityStats(context, batch, value)
      )
    )
)

export default deleteEntityStats
