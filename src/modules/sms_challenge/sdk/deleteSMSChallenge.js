import { deleteEntity } from 'moltres/core'
import { SMSChallenge } from '../schemas'

const deleteSMSChallenge = deleteEntity(SMSChallenge)

export default deleteSMSChallenge
