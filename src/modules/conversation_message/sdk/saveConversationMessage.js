import { saveEntity } from 'moltres/core'
import { ConversationMessage } from '../schemas'

const saveConversationMessage = saveEntity(ConversationMessage)

export default saveConversationMessage
