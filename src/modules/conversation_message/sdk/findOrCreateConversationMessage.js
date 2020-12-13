import { findOrCreateEntity } from 'moltres/core'
import { ConversationMessage } from '../schemas'

const findOrCreateConversationMessage = findOrCreateEntity(ConversationMessage)

export default findOrCreateConversationMessage
