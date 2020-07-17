import { DimensionsChangedAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const dimensionsChangedAction = actionBuilder({
  Schema: DimensionsChangedAction
})

export default dimensionsChangedAction
