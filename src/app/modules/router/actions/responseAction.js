import { ResponseAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const responseAction = actionBuilder({
  Schema: ResponseAction
})

export default responseAction
