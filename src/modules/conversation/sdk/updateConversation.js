import { updateEntity } from '../../../core/sdk'
import { Conversation } from '../schemas'

const updateConversation = updateEntity(Conversation)

export default updateConversation
