import buildReducer from './buildReducer'
import run from './run'

const module = (config) => ({
  reducer: buildReducer(config),
  run
})

export default module
