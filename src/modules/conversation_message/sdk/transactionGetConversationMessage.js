import { transactionGetEntity } from '../../../core/sdk'
import { ConversationMessage } from '../schemas'

const transactionGetConversationMessage = transactionGetEntity(
  ConversationMessage
)

export default transactionGetConversationMessage
