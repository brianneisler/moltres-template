import { deleteEntity } from '../../../core/sdk'
import { Conversation } from '../schemas'

const deleteConversation = deleteEntity(Conversation)

export default deleteConversation
