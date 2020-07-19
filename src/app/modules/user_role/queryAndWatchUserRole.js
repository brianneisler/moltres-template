import { factoryAndWatchQuery } from '../../../core'
import { refUserRoleById } from '../../../db/UserRole'
import { invariant, isString } from '../../../utils/lang'
import { call } from '../../../utils/redux'

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
