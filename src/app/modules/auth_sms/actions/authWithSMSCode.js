import { createAction } from '../../../../utils/redux'

const authWithSMSCode = createAction(
  'AUTH_WITH_SMS_CODE',
  ({ code, smsChallengeId }) => ({
    code,
    smsChallengeId
  })
)

export default authWithSMSCode
