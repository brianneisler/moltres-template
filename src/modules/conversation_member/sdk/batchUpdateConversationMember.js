import { batchUpdateEntity } from '../../../core/sdk'
import { ConversationMember } from '../schemas'

const batchUpdateConversationMember = batchUpdateEntity(ConversationMember)

export default batchUpdateConversationMember
