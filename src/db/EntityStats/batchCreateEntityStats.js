import { EntityStats } from './schemas'
import { assocProp, getPropOr, omit } from '../../utils/data'
import { batchCreateEntity } from '../Entity'
import batchCreateStatsShard from './batchCreateStatsShard'

const batchCreateEntityStats = (context, batch, data) => {
  data = assocProp('numberShards', 1, data)
  const ref = batchCreateEntity(EntityStats, context, batch, omit(['data'], data))
  batchCreateStatsShard(assocProp('parentRef', ref, context), batch, {
    data: getPropOr({}, 'data', data),
    index: 0
  })
  return ref
}

export default batchCreateEntityStats
