import { AuthStateChangedAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const authStateChangedAction = actionBuilder({
  Schema: AuthStateChangedAction
})

export default authStateChangedAction
