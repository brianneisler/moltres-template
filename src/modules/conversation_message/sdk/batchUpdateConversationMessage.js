import { batchUpdateEntity } from 'moltres/core'
import { ConversationMessage } from '../schemas'

const batchUpdateConversationMessage = batchUpdateEntity(ConversationMessage)

export default batchUpdateConversationMessage
