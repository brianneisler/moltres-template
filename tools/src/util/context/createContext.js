import getStage from './getStage'

const createContext = (options) => ({
  stage: getStage(options)
})

export default createContext
