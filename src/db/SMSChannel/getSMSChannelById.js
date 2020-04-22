import { SMSChannel } from './schemas'
import { getDocumentById } from '../../utils/db'

const getSMSChannelById = getDocumentById(SMSChannel)

export default getSMSChannelById
