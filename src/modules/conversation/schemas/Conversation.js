import { Entity, String } from '../../../core/schemas'

const Conversation = {
  collectionName: 'Conversations',
  name: 'Conversation',
  schema: Entity.schema.keys({
    visibility: String.schema.required()
  })
}

export default Conversation
