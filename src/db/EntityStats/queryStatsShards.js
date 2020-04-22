import { StatsShard } from './schemas'
import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/data'

const queryStatsShards = curry((context, { index }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(index)) {
        query = query.where('index', '==', index)
      }
      return query
    },
    StatsShard,
    context,
    queryOptions
  )
)

export default queryStatsShards
