import { UploadUserProfileImageAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const uploadUserProfileImageAction = actionBuilder({
  Schema: UploadUserProfileImageAction
})

export default uploadUserProfileImageAction
