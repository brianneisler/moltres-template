import { buildReducer } from '../util'
import run from './run'

const module = (config) => ({
  reducer: buildReducer(config),
  run
})

export default module
