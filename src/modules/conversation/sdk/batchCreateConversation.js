import { batchCreateEntity } from '../../../core/sdk'
import { Conversation } from '../schemas'

const batchCreateConversation = batchCreateEntity(Conversation)

export default batchCreateConversation
