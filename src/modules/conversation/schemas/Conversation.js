import { Entity, String } from '../../../core/schemas'
import { values } from '../../../utils/lang'
import { ConversationType, ConversationVisibility } from '../constants'

const Conversation = {
  collectionName: 'Conversations',
  name: 'Conversation',
  schema: Entity.schema.keys({
    type: String.schema.allow(...values(ConversationType)).required(),
    visibility: String.schema
      .allow(...values(ConversationVisibility))
      .required()
  })
}

export default Conversation
