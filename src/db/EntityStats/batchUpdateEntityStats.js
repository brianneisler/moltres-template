import { refGet } from '../../utils/db'
import { assoc, getProp, hasProp, omit } from '../../utils/lang'
import { batchUpdateEntity } from '../Entity'

import batchUpdateStatsShard from './batchUpdateStatsShard'
import { EntityStats } from './schemas'

const batchUpdateEntityStats = async (context, batch, id, updates) => {
  const ref = await batchUpdateEntity(
    EntityStats,
    context,
    batch,
    id,
    omit(['data'], updates)
  )
  if (hasProp('data', updates)) {
    const doc = await refGet(context, ref)
    if (doc.data().numberShards !== 1) {
      throw new Error('Update of more than 1 Shard has not been implemented')
    }
    await batchUpdateStatsShard(assoc('parentRef', ref, context), batch, 0, {
      data: getProp('data', updates)
    })
  }
  return ref
}

export default batchUpdateEntityStats
