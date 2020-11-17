import { batchCreateEntity } from 'moltres/core'
import { ConversationMember } from '../schemas'

const batchCreateConversationMember = batchCreateEntity(ConversationMember)

export default batchCreateConversationMember
