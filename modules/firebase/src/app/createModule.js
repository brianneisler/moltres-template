import baseCreateModule from '../createModule'
import initializeApp from '../initializeApp'

const createModule = (config) => ({
  ...baseCreateModule(config),
  initializeApp
})

export default createModule
