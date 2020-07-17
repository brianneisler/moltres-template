import { base64UrlEscape } from '../base64'
import crypto from 'crypto'

const sign = (input, key, method, type) => {
  let base64str
  if (type === 'hmac') {
    base64str = crypto.createHmac(method, key).update(input).digest('base64')
  } else if (type == 'sign') {
    base64str = crypto.createSign(method).update(input).sign(key, 'base64')
  } else {
    throw new Error('Algorithm type not recognized')
  }

  return base64UrlEscape(base64str)
}

export default sign
