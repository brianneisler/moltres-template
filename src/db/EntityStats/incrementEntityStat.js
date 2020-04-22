import { assocProp, random } from '../../utils/data'
import findOrCreateEntityStats from './findOrCreateEntityStats'
import refEntityStatsById from './refEntityStatsById'
import updateStatsShard from './updateStatsShard'

const incrementEntityStat = async (context, { entityId, entityType, stat }) => {
  const entityStats = await findOrCreateEntityStats(context, { entityId, entityType })
  const ref = refEntityStatsById(context, entityStats.id)
  const shardIndex = random(0, entityStats.numberShards - 1)
  const increment = context.firebase.firestore.FieldValue.increment(1)

  // TODO BRN: Wrap this in a try catch, if this fails because of the "maximum
  // write rate to a document" https://firebase.google.com/docs/firestore/quotas
  // then create a new shard and try again

  try {
    await updateStatsShard(assocProp('parentRef', ref, context), shardIndex, {
      [`data.${stat}`]: increment
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('UPDATE_STATS_SHARD error:', error)
    throw error
  }
  return entityStats
}

export default incrementEntityStat
