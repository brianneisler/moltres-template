import { batchCreateEntity } from '../../../core/sdk'
import { ConversationMember } from '../schemas'

const batchCreateConversationMember = batchCreateEntity(ConversationMember)

export default batchCreateConversationMember
