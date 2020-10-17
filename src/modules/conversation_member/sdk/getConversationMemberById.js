import { getDocumentById } from '../../../utils/db'
import { ConversationMember } from '../schemas'

const getConversationMemberById = getDocumentById(ConversationMember)

export default getConversationMemberById
