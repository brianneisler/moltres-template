import { actionBuilder } from 'moltres/redux'
import { DimensionsChangedAction } from '../schemas'

const dimensionsChangedAction = actionBuilder({
  Schema: DimensionsChangedAction
})

export default dimensionsChangedAction
