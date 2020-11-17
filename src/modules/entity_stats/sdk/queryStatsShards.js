import { buildQuery } from 'moltres/db'
import { curry, isUndefined } from 'moltres/lang'

import { StatsShard } from '../schemas'

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
