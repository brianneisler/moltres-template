import { UserRole } from './schemas'
import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/data'

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
