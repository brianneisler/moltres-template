import { Action } from '../../action/schemas'
import { Object } from '../../core/schemas'

const SetAppConfigAction = {
  name: 'app.SetAppConfigAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        config: Object.schema.required()
      })
      .required()
  })
}

export default SetAppConfigAction
