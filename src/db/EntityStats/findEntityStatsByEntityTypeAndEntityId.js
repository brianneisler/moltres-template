import { findOneFromQuery } from '../../utils/db'

import queryEntityStats from './queryEntityStats'

const findEntityStatsByEntityTypeAndEntityId = async (
  context,
  entityType,
  entityId,
  queryOptions = {}
) => {
  const query = queryEntityStats(
    context,
    { entityId, entityType },
    queryOptions
  )
  return findOneFromQuery(context, query, queryOptions)
}

export default findEntityStatsByEntityTypeAndEntityId
