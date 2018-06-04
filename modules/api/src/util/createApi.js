import bodyParser from 'body-parser'
import express from 'express'
import { reduce } from 'ramda'
import filterApis from './filterApis'

const createApi = (modules, context) => {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  const apis = filterApis(modules)
  return reduce(
    (accum, apiBuilder) => apiBuilder(accum, context),
    app,
    apis
  )
}

export default createApi
