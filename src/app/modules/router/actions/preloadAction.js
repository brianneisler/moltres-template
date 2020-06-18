import { PreloadAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const preloadAction = actionBuilder({
  Schema: PreloadAction
})

export default preloadAction
