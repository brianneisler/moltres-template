import { SetCurrentUserAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const setCurrentUserAction = actionBuilder({
  Schema: SetCurrentUserAction
})

export default setCurrentUserAction
