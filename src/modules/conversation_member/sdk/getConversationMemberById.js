import { getDocumentById } from 'moltres/db'
import { ConversationMember } from '../schemas'

const getConversationMemberById = getDocumentById(ConversationMember)

export default getConversationMemberById
