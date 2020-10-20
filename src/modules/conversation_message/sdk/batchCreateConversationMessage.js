import { batchCreateEntity } from '../../../core/sdk'
import { ConversationMessage } from '../schemas'

const batchCreateConversationMessage = batchCreateEntity(ConversationMessage)

export default batchCreateConversationMessage
