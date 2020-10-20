import { updateEntity } from '../../../core/sdk'
import { ConversationMember } from '../schemas'

const updateConversationMember = updateEntity(ConversationMember)

export default updateConversationMember
