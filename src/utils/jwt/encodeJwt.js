import { base64UrlEncode } from '../base64'
import { sign } from '../crypto'
import { join } from '../lang'

/**
 * support algorithm mapping
 */
const algorithmMap = {
  HS256: 'sha256',
  HS384: 'sha384',
  HS512: 'sha512',
  RS256: 'RSA-SHA256',
  none: 'none'
}

/**
 * Map algorithm to hmac or sign type, to determine which crypto function to use
 */
const typeMap = {
  HS256: 'hmac',
  HS384: 'hmac',
  HS512: 'hmac',
  RS256: 'sign',
  none: 'none'
}

/**
 * Encode jwt
 *
 * @param {Object} payload
 * @param {String} key
 * @param {String} algorithm
 * @param {Object} options
 * @return {String} token
 */
const encodeJwt = (payload, key, algorithm = 'RS256', options = {}) => {
  // Check key
  if (!key && algorithm !== 'none') {
    throw new Error('key must be defined')
  }

  const signingMethod = algorithmMap[algorithm]
  const signingType = typeMap[algorithm]
  if (!signingMethod || !signingType) {
    throw new Error('Algorithm not supported')
  }

  // header, typ is fixed value.
  let header = { alg: algorithm, typ: 'JWT' }
  if (options && options.header) {
    header = {
      ...header,
      ...options.header
    }
  }

  // create segments, all segments should be base64 string
  const segments = []
  segments.push(base64UrlEncode(JSON.stringify(header)))
  segments.push(base64UrlEncode(JSON.stringify(payload)))
  segments.push(sign(join('.', segments), key, signingMethod, signingType))

  return segments.join('.')
}

export default encodeJwt
