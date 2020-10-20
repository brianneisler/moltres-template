import { refDocumentById } from '../../../utils/db'
import { ConversationMember } from '../schemas'

const refConversationMemberById = refDocumentById(ConversationMember)

export default refConversationMemberById
