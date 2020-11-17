import { getDocumentById } from 'moltres/db'

import { SMSChannel } from '../schemas'

const getSMSChannelById = getDocumentById(SMSChannel)

export default getSMSChannelById
