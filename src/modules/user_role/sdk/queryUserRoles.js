import { curry, isUndefined } from 'moltres/lang'

import { buildQuery } from 'moltres/db'
import { UserRole } from '../schemas'

const queryUserRoles = curry((context, { userId }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(userId)) {
        query = query.where('userId', '==', userId)
      }
      return query
    },
    UserRole,
    context,
    queryOptions
  )
)

export default queryUserRoles
