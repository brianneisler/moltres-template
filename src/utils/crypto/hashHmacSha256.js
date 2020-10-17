import { createHmac } from 'crypto'

import { SHA256 } from '../../constants/Algorithm'
import { curry, isString } from '../lang'

const hashHmacSha256 = curry((secret, data) => {
  const hmac = createHmac(SHA256, secret)
  if (isString(data)) {
    hmac.update(data)
    return hmac.digest('hex')
  }
  throw new Error('unsupported data type received by hashHmacSha256')
})

export default hashHmacSha256
