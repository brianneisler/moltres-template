import { SignOutAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const signOutAction = actionBuilder({
  Schema: SignOutAction
})

export default signOutAction
