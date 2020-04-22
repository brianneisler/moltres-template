import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'
import Joi from '@hapi/joi'

const Notification = {
  collectionName: 'Notifications',
  name: 'Notification',
  schema: Entity.keys({
    meta: Joi.object().allow(null).required(),
    readAt: Joi.object().allow(null).required(),
    type: Joi.string().required(),
    userId: id().required()
  })
}

export default Notification
