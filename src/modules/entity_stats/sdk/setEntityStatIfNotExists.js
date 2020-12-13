import {
  createPath,
  getPath,
  mergeDeepRight,
  random,
  reduce
} from 'moltres/lang'

import findOrCreateEntityStats from './findOrCreateEntityStats'
import queryStatsShards from './queryStatsShards'
import refEntityStatsById from './refEntityStatsById'
import updateStatsShard from './updateStatsShard'

// TODO BRN: This should probably be improved to use a transaction
const setEntityStatIfNotExists = async (
  context,
  { entityId, entityType, stat, value }
) => {
  const entityStats = await findOrCreateEntityStats(context, {
    entityId,
    entityType
  })
  const ref = refEntityStatsById(context, entityStats.id)

  // TODO BRN: try to remove this use of parentRef
  const queryStatsShardsSnapshot = await queryStatsShards(
    {
      ...context,
      parentRef: ref
    },
    {},
    {}
  ).get()

  const results = reduce(
    (accum, shardDoc) => mergeDeepRight(accum, shardDoc.data()),
    {},
    queryStatsShardsSnapshot.docs
  )
  if (!getPath(createPath(`data.${stat}`), results)) {
    const shardIndex = random(0, entityStats.numberShards - 1)
    // TODO BRN: Wrap this in a try catch, if this fails because of the write
    // speed limit, then create a new shard and try again
    try {
      await updateStatsShard(context, [entityStats.id, shardIndex], {
        [`data.${stat}`]: value
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('UPDATE_STATS_SHARD error:', error)
      throw error
    }
  }
  return entityStats
}

export default setEntityStatIfNotExists
