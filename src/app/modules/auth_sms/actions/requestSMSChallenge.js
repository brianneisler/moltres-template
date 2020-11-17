import { createAction } from 'moltres/redux'

const requestSMSChallenge = createAction(
  'REQUEST_SMS_CHALLENGE',
  (phoneNumber) => ({
    phoneNumber
  })
)

export default requestSMSChallenge
