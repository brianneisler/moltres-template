import { getDocumentById } from '../../../utils/db'
import { SMSChannel } from '../schemas'

const getSMSChannelById = getDocumentById(SMSChannel)

export default getSMSChannelById
