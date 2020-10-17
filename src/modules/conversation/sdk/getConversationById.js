import { getDocumentById } from '../../../utils/db'
import { Conversation } from '../schemas'

const getConversationById = getDocumentById(Conversation)

export default getConversationById
