import { SetCurrentUserAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const setCurrentUserAction = actionBuilder({
  Schema: SetCurrentUserAction
})

export default setCurrentUserAction
