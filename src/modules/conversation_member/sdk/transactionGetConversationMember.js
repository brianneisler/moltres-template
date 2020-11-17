import { transactionGetEntity } from 'moltres/core'
import { ConversationMember } from '../schemas'

const transactionGetConversationMember = transactionGetEntity(
  ConversationMember
)

export default transactionGetConversationMember
