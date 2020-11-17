import { removeEntity } from 'moltres/core'
import { ConversationMessage } from '../schemas'

const removeConversationMessage = removeEntity(ConversationMessage)

export default removeConversationMessage
