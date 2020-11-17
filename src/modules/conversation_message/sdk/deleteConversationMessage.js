import { deleteEntity } from 'moltres/core'
import { ConversationMessage } from '../schemas'

const deleteConversationMessage = deleteEntity(ConversationMessage)

export default deleteConversationMessage
