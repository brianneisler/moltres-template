import { withConfig, withContext } from '../../../core'
import { getUserById } from '../../../db/User'
import { saveUserProfile } from '../../../db/UserProfile'
import { queryAndWatchUserProfile } from '../../../sdk/user_profile'
import { assoc, compose } from '../../../utils/lang'
import {
  call,
  fork,
  handleAction,
  handleActions,
  takeEvery
} from '../../../utils/redux'
import { watchCurrentUser } from '../auth'

import { SaveUserProfileAction, SetCurrentUserProfileAction } from './schemas'
import { queryAndWatchCurrentUserProfile } from './util'

const enhance = compose(withConfig('api'), withContext())

const mod = {
  reducer: handleActions(
    {
      [SetCurrentUserProfileAction.name]: (state, action) =>
        assoc('currentUserProfile', action.payload.currentUserProfile, state)
    },
    {
      // undefined indicates that these values have not been loaded.
      // null inidicates that this value was loaded but does not exist
      currentUserProfile: undefined
    }
  ),

  routes: [
    {
      exact: true,
      *handle(context, response, { match }) {
        const { userId } = match.params
        // NOTE BRN: This will throw an Expected error with a statusCode of 404
        // if it cannot find the User
        yield call(getUserById, context, userId)
        return { statusCode: 200 }
      },
      path: '/user/:userId',
      preload: enhance(function* (context, { first, match }) {
        if (first) {
          const { userId } = match.params
          yield call(queryAndWatchUserProfile, context, { userId })
        }
      })
    }
  ],
  run: function* run() {
    yield fork(
      watchCurrentUser,
      handleAction(
        enhance(function* (context, currentUser) {
          if (currentUser) {
            return yield call(
              queryAndWatchCurrentUserProfile,
              context,
              currentUser
            )
          }
        })
      )
    )

    yield takeEvery(
      SaveUserProfileAction.name,
      handleAction(
        enhance(function* (context, action) {
          yield call(saveUserProfile, context, action.payload.userProfile)
        })
      )
    )
  }
}

export default mod
