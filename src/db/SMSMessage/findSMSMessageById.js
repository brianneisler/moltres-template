import { findDocumentById } from '../../utils/db'

import { SMSMessage } from './schemas'

const findSMSMessageById = findDocumentById(SMSMessage)

export default findSMSMessageById
