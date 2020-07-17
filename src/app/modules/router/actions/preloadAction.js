import { actionBuilder } from '../../../../utils/redux'
import { PreloadAction } from '../schemas'

const preloadAction = actionBuilder({
  Schema: PreloadAction
})

export default preloadAction
