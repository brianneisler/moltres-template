import { removeEntity } from '../../../core/sdk'
import { ConversationMember } from '../schemas'

const removeConversationMember = removeEntity(ConversationMember)

export default removeConversationMember
