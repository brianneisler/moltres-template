import { getDocumentById } from '../../../utils/db'
import { ConversationMessage } from '../schemas'

const getConversationMessageById = getDocumentById(ConversationMessage)

export default getConversationMessageById
