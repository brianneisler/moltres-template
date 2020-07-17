import { actionBuilder } from '../../../../utils/redux'
import { TrackAction } from '../schemas'

const trackAction = actionBuilder({
  Schema: TrackAction
})

export default trackAction
