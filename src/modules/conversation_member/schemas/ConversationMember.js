import { Entity, Id, String } from '../../../core/schemas'
import { values } from '../../../utils/lang'
import { Conversation } from '../../conversation'
import { ConversationMemberRoles } from '../constants'

const ConversationMember = {
  collectionName: 'ConversationMembers',
  idField: 'userId',
  name: 'ConversationMember',
  parentRefIdField: 'conversationId',
  parentSchema: Conversation,
  schema: Entity.schema.keys({
    conversationId: Id.schema.required(),
    role: String.schema.allow(...values(ConversationMemberRoles)).required(),
    userId: Id.schema.required()
  })
}

export default ConversationMember
