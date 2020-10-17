import { refDocumentById } from '../../../utils/db'
import { Conversation } from '../schemas'

const refConversationById = refDocumentById(Conversation)

export default refConversationById
