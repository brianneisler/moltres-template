import { actionBuilder } from 'moltres/redux'
import { SignOutAction } from '../schemas'

const signOutAction = actionBuilder({
  Schema: SignOutAction
})

export default signOutAction
