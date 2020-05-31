import { SignOutAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const signOutAction = actionBuilder({
  Schema: SignOutAction
})

export default signOutAction
