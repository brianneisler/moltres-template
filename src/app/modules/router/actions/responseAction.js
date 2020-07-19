import { actionBuilder } from '../../../../utils/redux'
import { ResponseAction } from '../schemas'

const responseAction = actionBuilder({
  Schema: ResponseAction
})

export default responseAction
