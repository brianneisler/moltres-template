import { actionBuilder } from '../../../../utils/redux'
import { UploadUserProfileImageAction } from '../schemas'

const uploadUserProfileImageAction = actionBuilder({
  Schema: UploadUserProfileImageAction
})

export default uploadUserProfileImageAction
