import { removeEntity } from 'moltres/core'
import { ConversationMember } from '../schemas'

const removeConversationMember = removeEntity(ConversationMember)

export default removeConversationMember
