import * as actions from './actions'
import { NOT_FOUND } from '../../../constants/Code'
import { USER_PROFILE_UPDATE } from '../../../constants/Overlay'
import { call, put } from 'redux-saga/effects'
import { actions as overlayActions } from '../overlay'
import queryAndWatchUserProfile from './queryAndWatchUserProfile'

const queryAndWatchCurrentUserProfile = function* (context, currentUser) {
  const watcher = yield call(
    queryAndWatchUserProfile,
    context,
    { userId: currentUser.id },
    {
      *handler(currentUserProfile) {
        if (
          currentUserProfile.error &&
          currentUserProfile.error.code === NOT_FOUND
        ) {
          yield put(actions.setCurrentUserProfile(null))
          // show overlay to create user profile
          yield put(overlayActions.showOverlay(USER_PROFILE_UPDATE))
        } else {
          yield put(actions.setCurrentUserProfile(currentUserProfile))
        }
      }
    }
  )
  return watcher.task
}

export default queryAndWatchCurrentUserProfile
