import { actionBuilder } from '../../../../utils/redux'
import { SetAuthIdTokenAction } from '../schemas'

const setAuthIdTokenAction = actionBuilder({
  Schema: SetAuthIdTokenAction
})

export default setAuthIdTokenAction
