import { actionBuilder } from 'moltres/redux'
import { SetCurrentUserProfileAction } from '../schemas'

const setCurrentUserProfileAction = actionBuilder({
  Schema: SetCurrentUserProfileAction
})

export default setCurrentUserProfileAction
