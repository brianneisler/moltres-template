import { Action } from '../../Action'
import { Object, String } from '../../../core/schemas'

const EntityChangedAction = {
  schema: Action.schema.keys({
    meta: Object.schema.keys({
      causedByEntityId: String.schema.allow(null).required(),
      causedByEntityType: String.schema.allow(null).required()
    }),
    payload: Object.schema.keys({
      changeType: String.schema.required(),
      data: Object.schema.allow(null).required(),
      entityId: String.schema.required(),
      entityPath: String.schema.required(),
      entityType: String.schema.required(),
      prevData: Object.schema.allow(null).required()
    })
  }),
  type: 'ENTITY_CHANGED'
}

export default EntityChangedAction
