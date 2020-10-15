import { isString } from '../../../../utils/lang'

const isRequestChallenge = (request) =>
  request.body && isString(request.body.challenge)

export default isRequestChallenge
