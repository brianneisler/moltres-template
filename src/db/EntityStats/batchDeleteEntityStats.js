import { EntityStats } from './schemas'
import { batchDeleteEntity } from '../Entity'
import { map, range } from '../../utils/lang'
import batchDeleteStatsShard from './batchDeleteStatsShard'

const batchDeleteEntityStats = async (context, batch, id) => {
  const ref = await batchDeleteEntity(EntityStats, context, batch, id)
  const refDoc = await ref.get()
  const prevData = refDoc.data()
  return map(
    async (index) => batchDeleteStatsShard(context, batch, [id, index]),
    range(0, prevData.numberShards)
  )
}

export default batchDeleteEntityStats
