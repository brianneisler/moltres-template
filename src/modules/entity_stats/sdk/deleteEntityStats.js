import { buildBatch, commitBatch } from 'moltres/db'
import { curry } from 'moltres/lang'

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
