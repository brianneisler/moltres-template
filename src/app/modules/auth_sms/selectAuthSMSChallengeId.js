import { createSelector, select } from 'moltres/lang'

const selectAuthSMSChallengeId = select(
  createSelector('auth_sms.smsChallengeId')
)

export default selectAuthSMSChallengeId
