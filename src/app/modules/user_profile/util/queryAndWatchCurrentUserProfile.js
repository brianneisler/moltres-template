import { NOT_FOUND } from '../../../../constants/Code'
import { USER_PROFILE_UPDATE } from '../../../../constants/Overlay'
import { queryAndWatchUserProfile } from '../../../../sdk/user_profile'
import { call, put } from '../../../../utils/redux'
import { actions as overlayActions } from '../../overlay'
import { setCurrentUserProfileAction } from '../actions'

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
          yield put(setCurrentUserProfileAction(null))
          // show overlay to create user profile
          yield put(overlayActions.showOverlay(USER_PROFILE_UPDATE))
        } else {
          yield put(setCurrentUserProfileAction(currentUserProfile))
        }
      }
    }
  )
  return watcher.task
}

export default queryAndWatchCurrentUserProfile
