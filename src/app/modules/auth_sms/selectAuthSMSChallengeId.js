import { createSelector, select } from '../../../utils/lang'

const selectAuthSMSChallengeId = select(
  createSelector('auth_sms.smsChallengeId')
)

export default selectAuthSMSChallengeId
