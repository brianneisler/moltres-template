import { createAction } from 'moltres/redux'

const authWithSMSCode = createAction(
  'AUTH_WITH_SMS_CODE',
  ({ code, smsChallengeId }) => ({
    code,
    smsChallengeId
  })
)

export default authWithSMSCode
