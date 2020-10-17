import { saveEntity } from '../../../core/sdk'
import { Conversation } from '../schemas'

const saveConversation = saveEntity(Conversation)

export default saveConversation
