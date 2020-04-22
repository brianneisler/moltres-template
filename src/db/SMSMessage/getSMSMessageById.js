import { SMSMessage } from './schemas'
import { getDocumentById } from '../../utils/db'

const getSMSMessageById = getDocumentById(SMSMessage)

export default getSMSMessageById
