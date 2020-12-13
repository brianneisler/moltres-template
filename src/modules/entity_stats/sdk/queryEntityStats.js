import { buildQuery } from 'moltres/db'
import { curry, isUndefined } from 'moltres/lang'
import { EntityStats } from '../schemas'

const queryEntityStats = curry(
  (context, { entityId, entityType }, queryOptions) =>
    buildQuery(
      (query) => {
        if (!isUndefined(entityId)) {
          query = query.where('entityId', '==', entityId)
        }
        if (!isUndefined(entityType)) {
          query = query.where('entityType', '==', entityType)
        }
        return query
      },
      EntityStats,
      context,
      queryOptions
    )
)

export default queryEntityStats
