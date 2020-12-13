import { actionBuilder } from 'moltres/redux'
import { ResponseAction } from '../schemas'

const responseAction = actionBuilder({
  Schema: ResponseAction
})

export default responseAction
