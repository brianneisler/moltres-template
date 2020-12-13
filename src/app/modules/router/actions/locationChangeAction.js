import { actionBuilder } from 'moltres/redux'
import { LocationChangeAction } from '../schemas'

const locationChangeAction = actionBuilder({
  Schema: LocationChangeAction
})

export default locationChangeAction
