import { findOrCreateEntity } from '../../../core/sdk'
import { ConversationMessage } from '../schemas'

const findOrCreateConversationMessage = findOrCreateEntity(ConversationMessage)

export default findOrCreateConversationMessage
