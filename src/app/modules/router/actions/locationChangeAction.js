import { actionBuilder } from '../../../../utils/redux'
import { LocationChangeAction } from '../schemas'

const locationChangeAction = actionBuilder({
  Schema: LocationChangeAction
})

export default locationChangeAction
