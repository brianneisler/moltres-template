import { getDocumentById } from '../../../utils/db'
import { SMSMessage } from '../schemas'

const getSMSMessageById = getDocumentById(SMSMessage)

export default getSMSMessageById
