import { Entity } from '../../Entity'
import { NotificationSendState } from '../../../constants'
import { id } from '../../../utils/schema'
import { values } from '../../../utils/data'
import Joi from '@hapi/joi'
import Notification from './Notification'

const NotificationSend = {
  collectionName: 'NotificationSends',
  name: 'NotificationSend',
  parentSchema: Notification,
  schema: Entity.keys({
    channels: Joi.object().required(),
    errorId: id().allow(null).required(),
    notificationId: id().required(),
    sentAt: Joi.object().allow(null).required(),
    state: Joi.string()
      .valid(...values(NotificationSendState))
      .required(),
    userId: id().required()
  })
}

export default NotificationSend
