import { Router } from 'express'
import { reduce } from 'moltres-utils'

const createRouter = (routes) =>
  reduce((router, route) => router[route.method](route.path, route.handler), Router(), routes)

export default createRouter
