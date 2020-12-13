import { expected } from 'moltres/error'
import { fetch } from 'moltres/request'

const requestAuthSMSChallenge = async ({ api }, { phoneNumber }) => {
  // NOTE BRN: Cookies should automatically be included with the request since
  // same-origin is the default https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials#Value
  // NOTE BRN: This url should include the /api/v1 portion
  const response = await fetch(`${api.url}/auth/sms`, {
    body: JSON.stringify({
      phoneNumber
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

export default requestAuthSMSChallenge
