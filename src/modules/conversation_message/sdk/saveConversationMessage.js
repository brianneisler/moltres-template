import { saveEntity } from '../../../core/sdk'
import { ConversationMessage } from '../schemas'

const saveConversationMessage = saveEntity(ConversationMessage)

export default saveConversationMessage
