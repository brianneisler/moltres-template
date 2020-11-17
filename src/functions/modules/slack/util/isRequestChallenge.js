import { isString } from 'moltres/lang'

const isRequestChallenge = (request) =>
  request.body && isString(request.body.challenge)

export default isRequestChallenge
