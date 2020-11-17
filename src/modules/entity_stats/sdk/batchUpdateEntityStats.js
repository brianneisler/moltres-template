import { batchUpdateEntity } from 'moltres/core'
import { refGet } from 'moltres/db'
import { assoc, getProperty, hasProperty, omit } from 'moltres/lang'
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
      data: getProperty('data', updates)
    })
  }
  return ref
}

export default batchUpdateEntityStats
