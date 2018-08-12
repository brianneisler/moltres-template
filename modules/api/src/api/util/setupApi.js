import bodyParser from 'body-parser'
import express from 'express'
import { append, isNil, keys, prop, reduce, without } from 'moltres-utils'
import createRouter from './createRouter'

const setupApi = (store) => {
  const modules = store.getModules()
  let app = express()
  app.use(bodyParser.urlencoded({ extended: false }))

  app = reduce(
    (accum, name) => {
      const mod = prop(name, modules)
      const apiSetup = prop('setupApi', mod)
      if (!isNil(apiSetup)) {
        const api = apiSetup(accum)
        if (isNil(api)) {
          throw new Error(
            `${name} module's setupApi did not return an api. Did you forget to return it?`
          )
        }
        return api
      }
      return accum
    },
    app,
    keys(modules)
  )

  let routes = []
  let router = createRouter(routes)
  app.use((req, res, next) => {
    router(req, res, next)
  })
  return {
    getApp: () => app,
    getRoutes: () => routes,
    getRouter: () => router,
    addRoute: (route) => {
      routes = append(route, routes)
      router = createRouter(routes)
    },
    removeRoute: (route) => {
      routes = without([route], routes)
      router = createRouter(routes)
    }
  }
}

export default setupApi
