import createModule from '../createModule'
import initializeApp from '../initializeApp'

const module = (config) => ({
  ...createModule(config),
  initializeApp
})

export default module
