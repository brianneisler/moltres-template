import { loadProjectConfigSync } from '../../config'
import { generateEngine } from '../../core'

import * as modules from './modules'
import setupLoaderContext from './setupLoaderContext'

const setupLoader = () => {
  window.widget = window.widget || {}
  window.widget.loader = true
  const config = loadProjectConfigSync({ target: 'web' })
  const context = setupLoaderContext(config, {
    namespace: 'widget-loader'
  })
  const initialState = {}
  generateEngine(modules, context, initialState)
}

export default setupLoader
