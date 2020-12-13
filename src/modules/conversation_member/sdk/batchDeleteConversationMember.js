import { batchDeleteEntity } from 'moltres/core'
import { ConversationMember } from '../schemas'

const batchDeleteConversationMember = batchDeleteEntity(ConversationMember)

export default batchDeleteConversationMember
