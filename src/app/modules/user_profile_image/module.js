import { withConfig, withContext } from '../../../core'
import { uploadUserProfileImage } from '../../../modules/user_profile_image'
import { compose } from '../../../utils/lang'
import { call, handleAction, select, takeEvery } from '../../../utils/redux'
import { selectIdToken } from '../auth'

import { UploadUserProfileImageAction } from './schemas'

const enhance = compose(withConfig('api'), withContext())

const mod = () => ({
  *run() {
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
})

export default mod
