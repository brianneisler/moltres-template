import { findDocumentById } from '../../../utils/db'
import { Conversation } from '../schemas'

const findConversationById = findDocumentById(Conversation)

export default findConversationById
