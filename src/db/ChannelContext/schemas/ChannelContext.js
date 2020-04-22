import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'
import Joi from '@hapi/joi'

const ChannelContext = {
  collectionName: 'ChannelContexts',
  name: 'ChannelContext',
  schema: Entity.keys({
    channelId: id().required(),
    previous: Joi.object().required()
  })
}

export default ChannelContext
