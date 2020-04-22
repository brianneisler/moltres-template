import { SMSChallenge } from './schemas'
import { getDocumentById } from '../../utils/db'

const getSMSChallengeById = getDocumentById(SMSChallenge)

export default getSMSChallengeById
