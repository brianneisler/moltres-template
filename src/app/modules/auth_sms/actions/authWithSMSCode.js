import { createAction } from 'redux-actions'

const authWithSMSCode = createAction(
  'AUTH_WITH_SMS_CODE',
  ({ code, smsChallengeId }) => ({
    code,
    smsChallengeId
  })
)

export default authWithSMSCode
