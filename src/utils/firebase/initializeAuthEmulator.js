import { encodeJwt } from '../jwt'
import { append, reject } from '../lang'

const createCurrentUser = ({}) => ({
  getIdToken: async () => {}
})

const initializeAuthEmulator = ({ app, config }) => {
  let currentUser = null
  let listeners = []
  return {
    app,
    createCustomToken: async (uid, claims) => {
      const nowSeconds = Date.now() / 1000
      const clientEmail = config.firebase.serviceAccount.client_email
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
        config.firebase.serviceAccount.private_key
      )
    },
    get currentUser() {
      return currentUser
    },
    onAuthStateChanged: (listener) => {
      listeners = append(listener, listener)
      return () => {
        listeners = reject((value) => value === listener, listeners)
      }
    },
    signInWithCustomToken: async (idToken) => {
      // verify token
      // change current authenticated user
      // update the context
      // update the db authenticated user
      // trigger auth state changed event
      currentUser = createCurrentUser({ idToken })
      return {
        additionalUserInfo: {},
        credential: {},
        operationType: 'signin',
        user: currentUser
      }
    }
  }
}

export default initializeAuthEmulator
