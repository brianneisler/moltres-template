import { NotificationSendState } from '../../../constants'
import { Entity, Id, Object, String } from '../../../core/schemas'
import { values } from '../../../utils/lang'
import { Notification } from '../../notification/schemas'

const NotificationSend = {
  collectionName: 'NotificationSends',
  name: 'NotificationSend',
  parentRefIdField: 'notificationId',
  parentSchema: Notification,
  schema: Entity.schema.keys({
    channels: Object.schema.required(),
    errorId: Id.schema.allow(null).required(),
    notificationId: Id.schema.required(),
    sentAt: Object.schema.allow(null).required(),
    state: String.schema.valid(...values(NotificationSendState)).required(),
    userId: Id.schema.required()
  })
}

export default NotificationSend
