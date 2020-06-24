import { Action, Object } from '../../../../core/schemas'
import Dimensions from './Dimensions'

const DimensionsChangedAction = {
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        screen: Dimensions.schema.required(),
        window: Dimensions.schema.required()
      })
      .required()
  }),
  type: 'dimensions.DimensionsChangedAction'
}

export default DimensionsChangedAction
