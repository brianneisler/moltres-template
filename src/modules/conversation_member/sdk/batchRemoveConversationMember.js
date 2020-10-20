import { batchRemoveEntity } from '../../../core/sdk'
import { ConversationMember } from '../schemas'

const batchRemoveConversationMember = batchRemoveEntity(ConversationMember)

export default batchRemoveConversationMember
