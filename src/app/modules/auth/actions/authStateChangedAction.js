import { actionBuilder } from 'moltres/redux'
import { AuthStateChangedAction } from '../schemas'

const authStateChangedAction = actionBuilder({
  Schema: AuthStateChangedAction
})

export default authStateChangedAction
