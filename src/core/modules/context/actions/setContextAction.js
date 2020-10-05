import { actionBuilder } from '../../../../utils/redux'
import { SetContextAction } from '../schemas'

const setContextAction = actionBuilder({
  Schema: SetContextAction
})

export default setContextAction
