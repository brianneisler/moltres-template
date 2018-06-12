import bodyParser from 'body-parser'
import express from 'express'
import { isNil, keys, prop, reduce } from 'ramda'

const setupApi = (store) => {
  const modules = store.getModules()
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  return reduce(
    (accum, name) => {
      const mod = prop(name, modules)
      const apiSetup = prop('setupApi', mod)
      if (!isNil(apiSetup)) {
        const api = apiSetup(accum)
        if (isNil(api)) {
          throw new Error(`${name} module's setupApi did not return an api. Did you forget to return it?`)
        }
        return api
      }
      return accum
    },
    app,
    keys(modules)
  )
}

export default setupApi
