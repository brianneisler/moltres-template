import { queryEntities } from 'moltres/core'
import { ConversationMessage } from '../schemas'

const queryConversationMessages = queryEntities(ConversationMessage)

export default queryConversationMessages
