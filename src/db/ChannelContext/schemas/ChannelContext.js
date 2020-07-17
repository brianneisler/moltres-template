import { Id, Object } from '../../../core/schemas'
import { Entity } from '../../Entity'

const ChannelContext = {
  collectionName: 'ChannelContexts',
  name: 'ChannelContext',
  schema: Entity.schema.keys({
    channelId: Id.schema.required(),
    previous: Object.schema.required()
  })
}

export default ChannelContext
