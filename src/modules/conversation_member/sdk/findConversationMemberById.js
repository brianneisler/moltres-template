import { findDocumentById } from 'moltres/db'
import { ConversationMember } from '../schemas'

const findConversationMemberById = findDocumentById(ConversationMember)

export default findConversationMemberById
