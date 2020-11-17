import { refDocumentById } from 'moltres/db'

import { ConversationMessage } from '../schemas'

const refConversationMessageById = refDocumentById(ConversationMessage)

export default refConversationMessageById
