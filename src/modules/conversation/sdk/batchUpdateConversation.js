import { batchUpdateEntity } from '../../../core/sdk'
import { Conversation } from '../schemas'

const batchUpdateConversation = batchUpdateEntity(Conversation)

export default batchUpdateConversation
