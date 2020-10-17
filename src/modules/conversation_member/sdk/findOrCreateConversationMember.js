import { findOrCreateEntity } from '../../../core/sdk'
import { ConversationMember } from '../schemas'

const findOrCreateConversationMember = findOrCreateEntity(ConversationMember)

export default findOrCreateConversationMember
