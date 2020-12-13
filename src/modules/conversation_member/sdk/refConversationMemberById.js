import { refDocumentById } from 'moltres/db'

import { ConversationMember } from '../schemas'

const refConversationMemberById = refDocumentById(ConversationMember)

export default refConversationMemberById
