import { UploadUserProfileImageAction } from './schemas'
import { call, handleAction, select, takeEvery } from '../../../utils/redux'
import { compose } from '../../../utils/lang'
import { selectIdToken } from '../auth'
import { uploadUserProfileImage } from '../../../sdk/user_profile_image'
import { withConfig, withContext } from '../../../core'

const enhance = compose(withConfig('api'), withContext())

const mod = {
  run: function* run() {
    yield takeEvery(
      UploadUserProfileImageAction.name,
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
