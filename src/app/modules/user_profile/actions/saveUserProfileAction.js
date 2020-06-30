import { SaveUserProfileAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const saveUserProfileAction = actionBuilder({
  Schema: SaveUserProfileAction
})

export default saveUserProfileAction
