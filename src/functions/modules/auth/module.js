import { getUserById } from '../../../modules/user'
import { verifyIdToken } from '../../../utils/auth'

const mod = () => ({
  setupMiddleware: () => (request, response, next) => {
    const { adminContext, context } = request
    const idToken = request.headers['authorization']
    if (idToken) {
      verifyIdToken(adminContext, idToken)
        .then((decodedToken) => {
          const { uid } = decodedToken
          return getUserById(context, uid)
        })
        .then((currentUser) => {
          request.context = {
            ...context,
            currentUser
          }
          next()
        })
        .catch((error) => next(error))
    } else {
      // current user is anonymous
      request.context = {
        ...context,
        currentUser: null
      }
      next()
    }
  },
  setupRouter(router) {
    router.get('/api/auth', (req, res) => {
      // https://firebase.google.com/docs/auth/admin/create-custom-tokens

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end()
      // res.end(messagingResponse.toString())

      // TODO BRN: Figure out how much of the below comments stll make sense

      // get the current firebase app
      // check for a previously existing auth token
      // if token exists, attempt to auth with previous token
      // otherwise, authenticate user as an anonymous user
    })
    return router
  }
})

export default mod
