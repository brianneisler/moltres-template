import { batchDeleteEntity } from 'moltres/core'
import { ConversationMessage } from '../schemas'

const batchDeleteConversationMessage = batchDeleteEntity(ConversationMessage)

export default batchDeleteConversationMessage
