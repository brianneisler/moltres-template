import { Entity } from '../../Entity'
import { Id, Object } from '../../../core/schemas'

const ChannelContext = {
  collectionName: 'ChannelContexts',
  name: 'ChannelContext',
  schema: Entity.schema.keys({
    channelId: Id.schema.required(),
    previous: Object.schema.required()
  })
}

export default ChannelContext
