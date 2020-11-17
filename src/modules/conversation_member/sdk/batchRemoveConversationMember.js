import { batchRemoveEntity } from 'moltres/core'
import { ConversationMember } from '../schemas'

const batchRemoveConversationMember = batchRemoveEntity(ConversationMember)

export default batchRemoveConversationMember
