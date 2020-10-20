import { deleteEntity } from '../../../core/sdk'
import { ConversationMessage } from '../schemas'

const deleteConversationMessage = deleteEntity(ConversationMessage)

export default deleteConversationMessage
