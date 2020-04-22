import { EntityStats } from './schemas'
import { batchDeleteEntity } from '../Entity'
import { map, range } from '../../utils/data'
import batchDeleteStatsShard from './batchDeleteStatsShard'

const batchDeleteEntityStats = async (context, batch, id) => {
  const ref = await batchDeleteEntity(EntityStats, context, batch, id)
  const refDoc = await ref.get()
  const prevData = refDoc.data()
  return Promise.all(
    map(
      async (index) =>
        batchDeleteStatsShard(
          {
            ...context,
            parentRef: ref
          },
          batch,
          index
        ),
      range(0, prevData.numberShards)
    )
  )
}

export default batchDeleteEntityStats
