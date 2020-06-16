import { createAction } from 'redux-actions'

const requestSMSChallenge = createAction(
  'REQUEST_SMS_CHALLENGE',
  (phoneNumber) => ({
    phoneNumber
  })
)

export default requestSMSChallenge
