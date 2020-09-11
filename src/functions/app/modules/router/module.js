import express from 'express'

import { setupRouter } from './util'

const mod = () => ({
  setupMiddleware(store) {
    const router = express.Router()
    return setupRouter(router, store)
  }
})

export default mod
