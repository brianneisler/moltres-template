import { SignInWithIdTokenAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const signInWithIdTokenAction = actionBuilder({
  Schema: SignInWithIdTokenAction
})

export default signInWithIdTokenAction
