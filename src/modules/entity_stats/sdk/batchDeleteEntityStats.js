import { batchDeleteEntity } from 'moltres/core'
import { refGet } from 'moltres/db'
import { map, range } from 'moltres/lang'
import { EntityStats } from '../schemas'

import batchDeleteStatsShard from './batchDeleteStatsShard'

const batchDeleteEntityStats = async (context, batch, id) => {
  const ref = await batchDeleteEntity(EntityStats, context, batch, id)
  const refDoc = await refGet(context, ref)
  const prevData = refDoc.data()
  return map(
    async (index) => batchDeleteStatsShard(context, batch, [id, index]),
    range(0, prevData.numberShards)
  )
}

export default batchDeleteEntityStats
