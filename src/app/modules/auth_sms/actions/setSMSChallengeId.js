import { createAction } from '../../../../utils/redux'

const setSMSChallengeId = createAction(
  'SET_SMS_CHALLENGE_ID',
  (smsChallengeId) => ({
    smsChallengeId
  })
)

export default setSMSChallengeId
