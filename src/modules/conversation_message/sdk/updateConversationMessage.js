import { updateEntity } from '../../../core/sdk'
import { ConversationMessage } from '../schemas'

const updateConversationMessage = updateEntity(ConversationMessage)

export default updateConversationMessage
