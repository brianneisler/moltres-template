import { createAction } from '../../../../utils/redux'

const requestSMSChallenge = createAction(
  'REQUEST_SMS_CHALLENGE',
  (phoneNumber) => ({
    phoneNumber
  })
)

export default requestSMSChallenge
