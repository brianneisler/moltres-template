import * as actions from './actions'
import {
  all,
  call,
  fork,
  handleAction,
  handleActions,
  select,
  spawn,
  takeEvery
} from '../../../utils/redux'
import { assoc, compose } from '../../../utils/lang'
import { getUserById } from '../../../db/User'
import { queryAndWatchCurrentUserFollow } from '../user_follow'
import { queryAndWatchUserReactionEntityPages } from '../reaction'
import { queryAndWatchUserWATPages } from '../wat'
import { queryAndWatchUserWATThisPages } from '../wat_this'
import { saveUserProfile } from '../../../db/UserProfile'
import { selectIdToken, watchCurrentUser } from '../auth'
import { uploadUserProfileImage } from './sdk'
import { withConfig, withContext } from '../../../core'
import queryAndWatchCurrentUserProfile from './queryAndWatchCurrentUserProfile'
import queryAndWatchUserProfile from './queryAndWatchUserProfile'

const enhance = compose(withConfig('api'), withContext())

const mod = {
  reducer: handleActions(
    {
      [actions.setCurrentUserProfile]: (state, action) =>
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
          yield all([
            call(queryAndWatchUserProfile, context, { userId }),
            spawn(watchCurrentUser, function* (ctx, currentUser) {
              if (currentUser) {
                return yield call(
                  queryAndWatchCurrentUserFollow,
                  context,
                  currentUser,
                  userId
                )
              }
            }),
            call(queryAndWatchUserWATPages, context, userId)
          ])
        }
      })
    },
    {
      exact: true,
      *handle(context, response, { match }) {
        const { userId } = match.params
        // NOTE BRN: This will throw an Expected error with a statusCode of 404
        // if it cannot find the User
        yield call(getUserById, context, userId)
        return { statusCode: 200 }
      },
      path: '/user/:userId/images',
      preload: enhance(function* (context, { first, match }) {
        if (first) {
          const { userId } = match.params
          yield all([
            call(queryAndWatchUserProfile, context, { userId }),
            spawn(watchCurrentUser, function* (ctx, currentUser) {
              if (currentUser) {
                return yield call(
                  queryAndWatchCurrentUserFollow,
                  context,
                  currentUser,
                  userId
                )
              }
            }),
            call(queryAndWatchUserWATThisPages, context, userId)
          ])
        }
      })
    },
    {
      exact: true,
      *handle(context, response, { match }) {
        const { userId } = match.params
        // NOTE BRN: This will throw an Expected error with a statusCode of 404
        // if it cannot find the User
        yield call(getUserById, context, userId)
        return { statusCode: 200 }
      },
      path: '/user/:userId/reactions',
      preload: enhance(function* (context, { first, match }) {
        if (first) {
          const { userId } = match.params
          yield all([
            call(queryAndWatchUserProfile, context, { userId }),
            spawn(watchCurrentUser, function* (ctx, currentUser) {
              if (currentUser) {
                return yield call(
                  queryAndWatchCurrentUserFollow,
                  context,
                  currentUser,
                  userId
                )
              }
            }),
            call(queryAndWatchUserReactionEntityPages, context, userId)
          ])
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
      actions.saveUserProfile,
      handleAction(
        enhance(function* (context, action) {
          yield call(saveUserProfile, context, action.payload.userProfile)
        })
      )
    )

    yield takeEvery(
      actions.uploadUserProfileImage,
      handleAction(
        enhance(function* (context, action) {
          const idToken = yield select(selectIdToken)
          yield call(uploadUserProfileImage, context, {
            idToken,
            userProfileImage: action.payload.userProfileImage
          })
        })
      )
    )
  }
}

export default mod
