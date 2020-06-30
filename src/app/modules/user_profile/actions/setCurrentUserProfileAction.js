import { SetCurrentUserProfileAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const setCurrentUserProfileAction = actionBuilder({
  Schema: SetCurrentUserProfileAction
})

export default setCurrentUserProfileAction
