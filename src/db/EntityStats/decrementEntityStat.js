import { random } from '../../utils/data'
import findOrCreateEntityStats from './findOrCreateEntityStats'
import updateStatsShard from './updateStatsShard'

const decrementEntityStat = async (context, { entityId, entityType, stat }) => {
  const entityStats = await findOrCreateEntityStats(context, {
    entityId,
    entityType
  })
  const shardIndex = random(0, entityStats.numberShards - 1)
  const decrement = context.firebase.firestore.FieldValue.increment(-1)

  // TODO BRN: Wrap this in a try catch, if this fails because of the write
  // speed limit, then create a new shard and try again
  return updateStatsShard(context, [entityStats.id, shardIndex], {
    [`data.${stat}`]: decrement
  })
}

export default decrementEntityStat
