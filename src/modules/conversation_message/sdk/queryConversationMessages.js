import { queryEntities } from '../../../core/sdk'
import { ConversationMessage } from '../schemas'

const queryConversationMessages = queryEntities(ConversationMessage)

export default queryConversationMessages
