import { DimensionsChangedAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const dimensionsChanged = actionBuilder({
  Schema: DimensionsChangedAction
})

export default dimensionsChanged
