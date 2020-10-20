import { queryEntities } from '../../../core/sdk'
import { ConversationMember } from '../schemas'

const queryConversationMembers = queryEntities(ConversationMember)

export default queryConversationMembers
