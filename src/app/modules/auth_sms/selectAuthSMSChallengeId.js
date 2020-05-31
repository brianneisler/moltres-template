import { createSelector, select } from '../../../utils/data'

const selectAuthSMSChallengeId = select(createSelector('auth_sms.smsChallengeId'))

export default selectAuthSMSChallengeId
