import { SetAuthIdTokenAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const setAuthIdTokenAction = actionBuilder({
  Schema: SetAuthIdTokenAction
})

export default setAuthIdTokenAction
