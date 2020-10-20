import { findDocumentById } from '../../../utils/db'
import { ConversationMember } from '../schemas'

const findConversationMemberById = findDocumentById(ConversationMember)

export default findConversationMemberById
