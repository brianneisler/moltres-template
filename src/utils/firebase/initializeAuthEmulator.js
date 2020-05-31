import { append, reject } from '../data'
import { encodeJwt } from '../jwt'

const initializeAuthEmulator = ({ config }) => {
  // TODO BRN: Implement a simple emulator for the auth API
  let listeners = []
  return {
    createCustomToken: async (uid, claims) => {
      const nowSeconds = Date.now() / 1000
      const clientEmail = config.serviceAccount.client_email
      return encodeJwt(
        {
          aud:
            'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
          claims,
          exp: nowSeconds + 60 * 60,
          iat: nowSeconds,
          iss: clientEmail,
          sub: clientEmail,
          uid
        },
        config.serviceAccount.private_key
      )
    },
    onAuthStateChanged: (listener) => {
      listeners = append(listener, listener)
      return () => {
        listeners = reject((value) => value === listener, listeners)
      }
    }
  }
}

export default initializeAuthEmulator
