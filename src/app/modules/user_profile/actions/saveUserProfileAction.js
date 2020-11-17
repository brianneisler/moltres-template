import { actionBuilder } from 'moltres/redux'
import { SaveUserProfileAction } from '../schemas'

const saveUserProfileAction = actionBuilder({
  Schema: SaveUserProfileAction
})

export default saveUserProfileAction
