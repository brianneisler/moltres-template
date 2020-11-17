import { actionBuilder } from 'moltres/redux'
import { SignInWithIdTokenAction } from '../schemas'

const signInWithIdTokenAction = actionBuilder({
  Schema: SignInWithIdTokenAction
})

export default signInWithIdTokenAction
