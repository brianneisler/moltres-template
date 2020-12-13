import { getDocumentById } from 'moltres/db'

import { SMSMessage } from '../schemas'

const getSMSMessageById = getDocumentById(SMSMessage)

export default getSMSMessageById
