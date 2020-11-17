import { transactionGetEntity } from 'moltres/core'

import { Conversation } from '../schemas'

const transactionGetConversation = transactionGetEntity(Conversation)

export default transactionGetConversation
