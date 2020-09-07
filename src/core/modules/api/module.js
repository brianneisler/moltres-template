import { expected } from '../../../utils/error'

import { ApiConfig } from './schemas'

const mod = () => ({
  setupAPIRouter(router) {
    router.get('/api/v1*', () => {
      throw expected({
        code: 'UNKNOWN_ENDPOINT',
        message: 'Unknown endpoint',
        statusCode: 404
      })
    })
    return router
  }
})

mod.configSchema = ApiConfig

export default mod
