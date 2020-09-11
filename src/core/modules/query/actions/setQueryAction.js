import { actionBuilder } from '../../../../utils/redux'
import { SetQueryAction } from '../schemas'

const setQueryAction = actionBuilder({
  Schema: SetQueryAction
})

export default setQueryAction
