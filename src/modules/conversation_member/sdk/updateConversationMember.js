import { updateEntity } from 'moltres/core'
import { ConversationMember } from '../schemas'

const updateConversationMember = updateEntity(ConversationMember)

export default updateConversationMember
