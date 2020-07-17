import { actionBuilder } from '../../../../utils/redux'
import { SetCurrentUserProfileAction } from '../schemas'

const setCurrentUserProfileAction = actionBuilder({
  Schema: SetCurrentUserProfileAction
})

export default setCurrentUserProfileAction
