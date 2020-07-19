import { base64UrlDecode } from '../base64'
import { verify } from '../crypto'
import { split } from '../lang'

/**
 * support algorithm mapping
 */
const algorithmMap = {
  HS256: 'sha256',
  HS384: 'sha384',
  HS512: 'sha512',
  RS256: 'RSA-SHA256'
}

/**
 * Map algorithm to hmac or sign type, to determine which crypto function to use
 */
const typeMap = {
  HS256: 'hmac',
  HS384: 'hmac',
  HS512: 'hmac',
  RS256: 'sign'
}

/**
 * Decode jwt
 *
 * @param {Object} token
 * @param {String} key
 * @param {Boolean} [noVerify]
 * @param {String} [algorithm]
 * @return {Object} payload
 * @api public
 */
const decodeJwt = (token, key, noVerify, algorithm) => {
  // check token
  if (!token) {
    throw new Error('No token supplied')
  }
  // check segments
  const segments = split('.', token)
  if (segments.length !== 3) {
    throw new Error('Not enough or too many segments')
  }

  // All segment should be base64
  const headerSeg = segments[0]
  const payloadSeg = segments[1]
  const signatureSeg = segments[2]

  // base64 decode and parse JSON
  const header = JSON.parse(base64UrlDecode(headerSeg))
  const payload = JSON.parse(base64UrlDecode(payloadSeg))

  if (!noVerify) {
    if (!algorithm && /BEGIN( RSA)? PUBLIC KEY/.test(key.toString())) {
      algorithm = 'RS256'
    }

    const signingMethod = algorithmMap[algorithm || header.alg]
    const signingType = typeMap[algorithm || header.alg]
    if (!signingMethod || !signingType) {
      throw new Error('Algorithm not supported')
    }

    // verify signature. `sign` will return base64 string.
    const signingInput = [headerSeg, payloadSeg].join('.')
    if (!verify(signingInput, key, signingMethod, signingType, signatureSeg)) {
      throw new Error('Signature verification failed')
    }

    // Support for nbf and exp claims.
    // According to the RFC, they should be in seconds.
    if (payload.nbf && Date.now() < payload.nbf * 1000) {
      throw new Error('Token not yet active')
    }

    if (payload.exp && Date.now() > payload.exp * 1000) {
      throw new Error('Token expired')
    }
  }

  return payload
}

export default decodeJwt
