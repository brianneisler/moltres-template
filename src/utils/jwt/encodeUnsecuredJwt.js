import encodeJwt from './encodeJwt'

/** Create an unsecured JWT for the given auth payload. See https://tools.ietf.org/html/rfc7519#section-6. */
const encodeUnsecuredJwt = (payload) => {
  payload = {
    ...payload,
    // Ensure that the auth payload has a value for 'iat'.
    iat: payload.iat || 0,
    // Use `uid` field as a backup when `sub` is missing.
    sub: payload.sub || payload.uid
  }

  if (!payload.sub) {
    throw new Error("auth must be an object with a 'sub' or 'uid' field")
  }
  // // Unsecured JWTs use the empty string as a signature.
  // const signature = ''
  // return [
  //   base64.encodeString(JSON.stringify(header), /* webSafe=*/ false),
  //   base64.encodeString(JSON.stringify(auth), /* webSafe=*/ false),
  //   signature
  // ].join('.')
  const options = {
    header: {
      kid: 'fakekid'
    }
  }

  // Unsecured JWTs use "none" as the algorithm.
  return encodeJwt(payload, null, 'none', options)
}

export default encodeUnsecuredJwt
