import { findDocumentById } from 'moltres/db'

import { SMSMessage } from '../schemas'

const findSMSMessageById = findDocumentById(SMSMessage)

export default findSMSMessageById
