import { batchDeleteEntity } from '../../../core/sdk'
import { Conversation } from '../schemas'

const batchDeleteConversation = batchDeleteEntity(Conversation)

export default batchDeleteConversation
