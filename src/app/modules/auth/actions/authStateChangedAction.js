import { AuthStateChangedAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const authStateChangedAction = actionBuilder({
  Schema: AuthStateChangedAction
})

export default authStateChangedAction
