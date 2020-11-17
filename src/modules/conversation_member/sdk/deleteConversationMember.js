import { deleteEntity } from 'moltres/core'
import { ConversationMember } from '../schemas'

const deleteConversationMember = deleteEntity(ConversationMember)

export default deleteConversationMember
