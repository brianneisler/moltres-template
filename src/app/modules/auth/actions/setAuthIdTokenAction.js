import { actionBuilder } from 'moltres/redux'
import { SetAuthIdTokenAction } from '../schemas'

const setAuthIdTokenAction = actionBuilder({
  Schema: SetAuthIdTokenAction
})

export default setAuthIdTokenAction
