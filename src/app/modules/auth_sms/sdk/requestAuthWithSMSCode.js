import { expected } from '../../../../utils/error'
import fetch from '../../../../utils/request/fetch'

const requestAuthWithSMSCode = async ({ api }, { code, smsChallengeId }) => {
  const response = await fetch(`${api.url}/auth/sms/${smsChallengeId}`, {
    body: JSON.stringify({
      code
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const result = await response.json()
  if (response.status === 200) {
    return result
  }
  // Our server should respond with json. Otherwise something serious went wrong.
  throw expected(result.error)
}

export default requestAuthWithSMSCode
