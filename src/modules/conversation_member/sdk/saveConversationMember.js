import { saveEntity } from '../../../core/sdk'
import { ConversationMember } from '../schemas'

const saveConversationMember = saveEntity(ConversationMember)

export default saveConversationMember
