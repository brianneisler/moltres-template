import { findDocumentById } from '../../../utils/db'
import { ConversationMessage } from '../schemas'

const findConversationMessageById = findDocumentById(ConversationMessage)

export default findConversationMessageById
