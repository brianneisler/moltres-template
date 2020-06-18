import { call, invariant } from '../../../utils/redux'
import { factoryAndWatchQuery } from '../../../core'
import { isString } from '../../../utils/lang'
import { refUserProfileById } from '../../../db/UserProfile'
import enhanceUserProfile from './enhanceUserProfile'

const queryAndWatchUserProfile = function* (
  context,
  { userId },
  { handler } = {}
) {
  invariant(isString(userId), 'userId must be a String')

  return yield call(factoryAndWatchQuery, {
    context,
    createQuery: refUserProfileById,
    enhancer: enhanceUserProfile,
    initialState: { ids: userId },
    queryKey: `UserProfile.${userId}`,
    watcherOptions: { handler }
  })
}

export default queryAndWatchUserProfile
