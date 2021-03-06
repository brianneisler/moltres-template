import { batchCreateEntity } from '../../../core/sdk'
import { assoc, getPropertyOr, omit } from '../../../utils/lang'
import { EntityStats } from '../schemas'

import batchCreateStatsShard from './batchCreateStatsShard'

const batchCreateEntityStats = (context, batch, data) => {
  data = assoc('numberShards', 1, data)
  const ref = batchCreateEntity(
    EntityStats,
    context,
    batch,
    omit(['data'], data)
  )

  // TODO BRN: replace this parentRef part with a parentRefIdField in the schema
  // (need to add that and update the StatsShard to include an entityStatsId field)
  batchCreateStatsShard(assoc('parentRef', ref, context), batch, {
    data: getPropertyOr({}, 'data', data),
    index: 0
  })
  return ref
}

export default batchCreateEntityStats
