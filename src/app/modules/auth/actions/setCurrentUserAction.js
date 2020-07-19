import { actionBuilder } from '../../../../utils/redux'
import { SetCurrentUserAction } from '../schemas'

const setCurrentUserAction = actionBuilder({
  Schema: SetCurrentUserAction
})

export default setCurrentUserAction
