import { deleteEntity } from '../../../core/sdk'
import { ConversationMember } from '../schemas'

const deleteConversationMember = deleteEntity(ConversationMember)

export default deleteConversationMember
