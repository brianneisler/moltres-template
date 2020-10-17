import { removeEntity } from '../../../core/sdk'
import { Conversation } from '../schemas'

const removeConversation = removeEntity(Conversation)

export default removeConversation
