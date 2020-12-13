import { findOrCreateEntity } from 'moltres/core'
import { ConversationMember } from '../schemas'

const findOrCreateConversationMember = findOrCreateEntity(ConversationMember)

export default findOrCreateConversationMember
