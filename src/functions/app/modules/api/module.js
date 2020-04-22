import { expected } from '../../../../utils/error'

const mod = {
  setupAPIRouter: (router) => {
    router.get('/api/v1*', () => {
      throw expected({
        code: 'UNKNOWN_ENDPOINT',
        message: 'Unknown endpoint',
        statusCode: 404
      })
    })
    return router
  }
}

export default mod
