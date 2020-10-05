import { batchUpdateEntity } from '../../../core/sdk'
import { refGet } from '../../../utils/db'
import { assoc, getProp, hasProperty, omit } from '../../../utils/lang'
import { EntityStats } from '../schemas'

import batchUpdateStatsShard from './batchUpdateStatsShard'

const batchUpdateEntityStats = async (context, batch, id, updates) => {
  const ref = await batchUpdateEntity(
    EntityStats,
    context,
    batch,
    id,
    omit(['data'], updates)
  )
  if (hasProperty('data', updates)) {
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
