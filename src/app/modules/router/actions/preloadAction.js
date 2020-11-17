import { actionBuilder } from 'moltres/redux'
import { PreloadAction } from '../schemas'

const preloadAction = actionBuilder({
  Schema: PreloadAction
})

export default preloadAction
