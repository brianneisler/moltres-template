import { queryEntities } from 'moltres/core'
import { ConversationMember } from '../schemas'

const queryConversationMembers = queryEntities(ConversationMember)

export default queryConversationMembers
