import { SetAuthIdTokenAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const setAuthIdTokenAction = actionBuilder({
  Schema: SetAuthIdTokenAction
})

export default setAuthIdTokenAction
