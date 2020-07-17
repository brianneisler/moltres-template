import { LocationChangeAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const locationChangeAction = actionBuilder({
  Schema: LocationChangeAction
})

export default locationChangeAction
