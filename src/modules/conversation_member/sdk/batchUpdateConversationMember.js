import { batchUpdateEntity } from 'moltres/core'
import { ConversationMember } from '../schemas'

const batchUpdateConversationMember = batchUpdateEntity(ConversationMember)

export default batchUpdateConversationMember
