import { Entity, Id, Object } from 'moltres/core'

const ChannelContext = {
  collectionName: 'ChannelContexts',
  name: 'ChannelContext',
  schema: Entity.schema.keys({
    channelId: Id.schema.required(),
    previous: Object.schema.required()
  })
}

export default ChannelContext
