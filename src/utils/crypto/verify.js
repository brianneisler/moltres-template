import { base64UrlUnescape } from '../base64'

import sign from './sign'

const verify = (input, key, method, type, signature) => {
  if (type === 'hmac') {
    return signature === sign(input, key, method, type)
  } else if (type == 'sign') {
    return crypto
      .createVerify(method)
      .update(input)
      .verify(key, base64UrlUnescape(signature), 'base64')
  }

  throw new Error('Algorithm type not recognized')
}

export default verify
