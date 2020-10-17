import { removeEntity } from '../../../core/sdk'
import { ConversationMessage } from '../schemas'

const removeConversationMessage = removeEntity(ConversationMessage)

export default removeConversationMessage
