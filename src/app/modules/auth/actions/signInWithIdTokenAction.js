import { actionBuilder } from '../../../../utils/redux'
import { SignInWithIdTokenAction } from '../schemas'

const signInWithIdTokenAction = actionBuilder({
  Schema: SignInWithIdTokenAction
})

export default signInWithIdTokenAction
