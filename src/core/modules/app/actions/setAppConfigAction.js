import { actionBuilder } from '../../../../utils/redux'
import { SetAppConfigAction } from '../schemas'

const setAppConfigAction = actionBuilder({
  Schema: SetAppConfigAction
})

export default setAppConfigAction
