import { queryEntities } from '../../../core/sdk'
import { Conversation } from '../schemas'

const queryConversations = queryEntities(Conversation)

export default queryConversations
