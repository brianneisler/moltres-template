import { createAction } from 'moltres/redux'

const setSMSChallengeId = createAction(
  'SET_SMS_CHALLENGE_ID',
  (smsChallengeId) => ({
    smsChallengeId
  })
)

export default setSMSChallengeId
