import { Array, Entity, Id, String, Timestamp } from '../../../core/schemas'
import { Conversation } from '../../conversation'

const ConversationMessage = {
  collectionName: 'ConversationMessages',
  name: 'ConversationMessage',
  parentRefIdField: 'conversationId',
  parentSchema: Conversation,
  schema: Entity.schema.keys({
    attachments: Array.schema.allow(null).required(),
    conversationId: Id.schema.required(),
    editedAt: Timestamp.schema.allow(null).required(),
    sentAt: Timestamp.schema.allow(null).required(),
    text: String.schema.required(),
    type: String.schema.required(),
    userId: Id.schema.required()
  })
}

export default ConversationMessage
