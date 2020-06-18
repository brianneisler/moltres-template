import { SignInWithIdTokenAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const signInWithIdTokenAction = actionBuilder({
  Schema: SignInWithIdTokenAction
})

export default signInWithIdTokenAction
