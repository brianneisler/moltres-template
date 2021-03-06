import { Action, Object, String } from '../../../../core/schemas'

const TrackAction = {
  name: 'tracking.TrackAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        eventName: String.schema.required(),
        options: Object.schema,
        properties: Object.schema
      })
      .required()
  })
}

export default TrackAction
