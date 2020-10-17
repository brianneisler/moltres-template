import { batchUpdateEntity } from '../../../core/sdk'
import { ConversationMessage } from '../schemas'

const batchUpdateConversationMessage = batchUpdateEntity(ConversationMessage)

export default batchUpdateConversationMessage
