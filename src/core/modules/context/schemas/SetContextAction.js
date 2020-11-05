import Joi from 'joi'

import { Action } from '../../action/schemas'
import { Any, Array, Object, String } from '../../core/schemas'

const SetContextAction = {
  name: 'context.SetContextAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        selector: Joi.alternatives(String.schema, Array.schema),
        value: Any.schema
      })
      .required()
  })
}

export default SetContextAction
