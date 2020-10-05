import { Entity, Id, Object, String } from '../../../core/schemas'

const Notification = {
  collectionName: 'Notifications',
  name: 'Notification',
  schema: Entity.schema.keys({
    meta: Object.schema.allow(null).required(),
    readAt: Object.schema.allow(null).required(),
    type: String.schema.required(),
    userId: Id.schema.required()
  })
}

export default Notification
