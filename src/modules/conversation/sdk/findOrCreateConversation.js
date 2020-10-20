import { findOrCreateEntity } from '../../../core/sdk'
import { Conversation } from '../schemas'

const findOrCreateConversation = findOrCreateEntity(Conversation)

export default findOrCreateConversation
