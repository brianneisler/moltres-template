import { buildQuery } from '../../../utils/db'
import { curry, isUndefined } from '../../../utils/lang'
import { Role } from '../schemas'

const queryRoles = curry((context, { userId }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(userId)) {
        query = query.where('userId', '==', userId)
      }
      return query
    },
    Role,
    context,
    queryOptions
  )
)

export default queryRoles
