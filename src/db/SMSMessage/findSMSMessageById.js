import { SMSMessage } from './schemas'
import { findDocumentById } from '../../utils/db'

const findSMSMessageById = findDocumentById(SMSMessage)

export default findSMSMessageById
