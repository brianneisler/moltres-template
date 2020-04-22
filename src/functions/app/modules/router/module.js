import { setupRouter } from './util'
import express from 'express'

const mod = {
  setupMiddleware: (store) => {
    const router = express.Router()
    return setupRouter(router, store)
  }
}

export default mod
