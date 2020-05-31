import { Action } from '../../../../db/Action'
import Dimensions from './Dimensions'
import Joi from '@hapi/joi'

const DimensionsChangedAction = {
  schema: Action.schema.keys({
    payload: Joi.object()
      .keys({
        screen: Dimensions.schema.required(),
        window: Dimensions.schema.required()
      })
      .required()
  }),
  type: 'dimensions.DimensionsChangedAction'
}

export default DimensionsChangedAction
