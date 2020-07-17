import { assoc, getPropOr, omit } from '../../utils/lang'
import { batchCreateEntity } from '../Entity'

import batchCreateStatsShard from './batchCreateStatsShard'
import { EntityStats } from './schemas'

const batchCreateEntityStats = (context, batch, data) => {
  data = assoc('numberShards', 1, data)
  const ref = batchCreateEntity(
    EntityStats,
    context,
    batch,
    omit(['data'], data)
  )
  batchCreateStatsShard(assoc('parentRef', ref, context), batch, {
    data: getPropOr({}, 'data', data),
    index: 0
  })
  return ref
}

export default batchCreateEntityStats
