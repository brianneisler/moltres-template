import { Action, Object } from '../../../../core/schemas'

const LocationChangeAction = {
  schema: Action.schema.keys({
    payload: Object.schema.keys({
      location: Object.schema.required()
    })
  }),
  type: '@@router/LOCATION_CHANGE'
}

export default LocationChangeAction
