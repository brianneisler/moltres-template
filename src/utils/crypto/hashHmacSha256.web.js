import hmacSha256 from 'crypto-js/hmac-sha256'

import { curry, isString } from '../lang'

const hashHmacSha256 = curry((secret, data) => {
  if (isString(data)) {
    return hmacSha256(data, secret)
  }
  throw new Error('unsupported data type received by hashHmacSha256')
})

export default hashHmacSha256
