import { factoryAndWatchQuery } from 'moltres/core'
import { refUserRoleById } from '../../../modules/user_role'
import { invariant, isString } from 'moltres/lang'
import { call } from 'moltres/redux'

const queryAndWatchUserRole = function* (context, userId, { handler } = {}) {
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
