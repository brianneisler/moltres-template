import { Entity } from '../../Entity'
import { Id, Object, String } from '../../../core/schemas'
import { NotificationSendState } from '../../../constants'
import { values } from '../../../utils/lang'
import Notification from '../../Notification/schemas/Notification'

const NotificationSend = {
  collectionName: 'NotificationSends',
  name: 'NotificationSend',
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
