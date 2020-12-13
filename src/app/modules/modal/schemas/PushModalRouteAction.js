import { Action, Object, String } from 'moltres/core'

const PushModalRouteAction = {
  name: 'modal.PushModalRouteAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        name: String.schema.required(),
        options: Object.schema
      })
      .required()
  })
}

export default PushModalRouteAction
