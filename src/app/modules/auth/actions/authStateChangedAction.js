import { actionBuilder } from '../../../../utils/redux'
import { AuthStateChangedAction } from '../schemas'

const authStateChangedAction = actionBuilder({
  Schema: AuthStateChangedAction
})

export default authStateChangedAction
