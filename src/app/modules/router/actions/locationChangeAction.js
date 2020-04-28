import { LocationChangeAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const locationChangeAction = actionBuilder({
  Schema: LocationChangeAction
})

export default locationChangeAction
