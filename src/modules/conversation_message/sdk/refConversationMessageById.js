import { refDocumentById } from '../../../utils/db'
import { ConversationMessage } from '../schemas'

const refConversationMessageById = refDocumentById(ConversationMessage)

export default refConversationMessageById
