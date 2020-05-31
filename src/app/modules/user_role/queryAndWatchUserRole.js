import { call, invariant } from '../../../utils/lang'
import { factoryAndWatchQuery } from '../../../core'
import { isString } from '../../../utils/data'
import { refUserRoleById } from '../../../db/UserRole'

const queryAndWatchUserRole = function*(context, userId, { handler } = {}) {
  invariant(isString(userId), 'userId must be a String')

  return yield call(factoryAndWatchQuery, {
    context,
    createQuery: refUserRoleById,
    initialState: { ids: userId },
    queryKey: `UserRole.${userId}`,
    watcherOptions: { handler }
  })
}

export default queryAndWatchUserRole
