import { batchDeleteEntity } from '../../../core/sdk'
import { ConversationMessage } from '../schemas'

const batchDeleteConversationMessage = batchDeleteEntity(ConversationMessage)

export default batchDeleteConversationMessage
