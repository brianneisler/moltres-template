import { batchDeleteEntity } from '../../../core/sdk'
import { ConversationMember } from '../schemas'

const batchDeleteConversationMember = batchDeleteEntity(ConversationMember)

export default batchDeleteConversationMember
