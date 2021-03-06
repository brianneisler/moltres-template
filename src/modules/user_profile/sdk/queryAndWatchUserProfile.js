import { factoryAndWatchQuery } from '../../../core'
import { invariant, isString } from '../../../utils/lang'
import { call } from '../../../utils/redux'

import enhanceUserProfile from './enhanceUserProfile'
import refUserProfileById from './refUserProfileById'

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
