import { DimensionsChangedAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const dimensionsChanged = actionBuilder({
  Schema: DimensionsChangedAction
})

export default dimensionsChanged
