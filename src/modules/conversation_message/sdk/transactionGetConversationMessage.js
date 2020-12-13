import { transactionGetEntity } from 'moltres/core'
import { ConversationMessage } from '../schemas'

const transactionGetConversationMessage = transactionGetEntity(
  ConversationMessage
)

export default transactionGetConversationMessage
