import bodyParser from 'body-parser'
import express from 'express'
import { compose } from 'ramda'
import filterApis from './filterApis'

const createApi = (modules, context) => {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }));
  const apis = filterApis(modules)
  const apiBuilder = compose(...apis)
  return apiBuilder(app)
}

export default createApi
