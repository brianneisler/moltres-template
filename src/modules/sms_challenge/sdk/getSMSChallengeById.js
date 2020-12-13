import { getDocumentById } from 'moltres/db'

import { SMSChallenge } from '../schemas'

const getSMSChallengeById = getDocumentById(SMSChallenge)

export default getSMSChallengeById
