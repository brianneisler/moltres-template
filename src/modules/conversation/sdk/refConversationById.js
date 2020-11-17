import { refDocumentById } from 'moltres/db'

import { Conversation } from '../schemas'

const refConversationById = refDocumentById(Conversation)

export default refConversationById
