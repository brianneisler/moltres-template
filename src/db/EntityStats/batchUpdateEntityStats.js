import { EntityStats } from './schemas'
import { assocProp, getProp, hasProp, omit } from '../../utils/data'
import { batchUpdateEntity } from '../Entity'
import batchUpdateStatsShard from './batchUpdateStatsShard'

const batchUpdateEntityStats = async (context, batch, id, updates) => {
  const ref = await batchUpdateEntity(EntityStats, context, batch, id, omit(['data'], updates))
  if (hasProp('data', updates)) {
    const doc = await ref.get()
    if (doc.data().numberShards !== 1) {
      throw new Error('Update of more than 1 Shard has not been implemented')
    }
    await batchUpdateStatsShard(assocProp('parentRef', ref, context), batch, 0, {
      data: getProp('data', updates)
    })
  }
  return ref
}

export default batchUpdateEntityStats
