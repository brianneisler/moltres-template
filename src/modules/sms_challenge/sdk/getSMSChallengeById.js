import { getDocumentById } from '../../../utils/db'
import { SMSChallenge } from '../schemas'

const getSMSChallengeById = getDocumentById(SMSChallenge)

export default getSMSChallengeById
