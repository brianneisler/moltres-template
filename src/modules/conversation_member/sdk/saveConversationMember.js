import { saveEntity } from 'moltres/core'
import { ConversationMember } from '../schemas'

const saveConversationMember = saveEntity(ConversationMember)

export default saveConversationMember
